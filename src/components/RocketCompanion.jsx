import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useSpring } from "motion/react";
import * as THREE from "three";
import { useIsMobile } from "../hooks/useMediaQuery";

/**
 * Comet companion — a glowing orb with a long fading particle trail.
 * Pure Three.js geometry, no GLTF, no orientation problems.
 * Scroll-driven path: right-side drift → orbit in Stack → weave in Journey.
 */

const ORBIT_SELECTOR = ".orbit-stage";
const JOURNEY_SELECTOR = ".journey-stage";
const TRAIL_LEN = 80;

// ---- Comet Head: bright icosahedron + additive glow shell ----
function CometHead() {
    return (
        <group>
            {/* Solid bright core */}
            <mesh>
                <icosahedronGeometry args={[0.35, 2]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Soft glow shell — larger, additive, transparent */}
            <mesh>
                <icosahedronGeometry args={[0.8, 2]} />
                <meshBasicMaterial
                    color="#55ddee"
                    transparent
                    opacity={0.18}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
            {/* Outer haze */}
            <mesh>
                <icosahedronGeometry args={[1.6, 1]} />
                <meshBasicMaterial
                    color="#7a57db"
                    transparent
                    opacity={0.06}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

// ---- Trail: spring-chain points that chase the comet ----
function CometTrail({ posRef }) {
    const pointsRef = useRef();
    const chainRef = useRef(null); // array of {x, y, z}
    const initRef = useRef(false);

    const { geometry, material } = useMemo(() => {
        const positions = new Float32Array(TRAIL_LEN * 3);
        const sizes = new Float32Array(TRAIL_LEN);
        const alphas = new Float32Array(TRAIL_LEN);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: /* glsl */ `
                attribute float aSize;
                attribute float aAlpha;
                varying float vAlpha;
                uniform float uPixelRatio;
                void main() {
                    vAlpha = aAlpha;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aSize * uPixelRatio * (120.0 / -mv.z);
                }
            `,
            fragmentShader: /* glsl */ `
                varying float vAlpha;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    if (d > 0.5) discard;
                    float soft = smoothstep(0.5, 0.0, d);
                    vec3 white = vec3(1.0);
                    vec3 cyan = vec3(0.2, 0.76, 0.8);
                    vec3 lavender = vec3(0.48, 0.34, 0.86);
                    float t = 1.0 - vAlpha;
                    vec3 col = mix(white, cyan, smoothstep(0.0, 0.3, t));
                    col = mix(col, lavender, smoothstep(0.3, 0.8, t));
                    gl_FragColor = vec4(col, vAlpha * soft * 0.85);
                }
            `,
        });

        return { geometry: geo, material: mat };
    }, []);

    useFrame((_, delta) => {
        if (!posRef.current || !pointsRef.current) return;
        const dt = Math.min(0.1, delta);
        const px = posRef.current.x;
        const py = posRef.current.y;

        // Initialize chain at comet position
        if (!initRef.current) {
            chainRef.current = [];
            for (let i = 0; i < TRAIL_LEN; i++) {
                chainRef.current.push({ x: px, y: py, z: 0 });
            }
            initRef.current = true;
        }

        const chain = chainRef.current;

        // Point 0 snaps to comet head
        chain[0].x = px;
        chain[0].y = py;

        // Each subsequent point chases the one in front of it.
        // Front points chase fast, tail points chase slow → natural taper.
        for (let i = 1; i < TRAIL_LEN; i++) {
            const t = i / TRAIL_LEN; // 0 = head, 1 = tail
            // Chase rate: head-adjacent points are very tight, tail is loose
            const rate = 18 * (1 - t * 0.7);
            const k = 1 - Math.exp(-rate * dt);
            chain[i].x += (chain[i - 1].x - chain[i].x) * k;
            chain[i].y += (chain[i - 1].y - chain[i].y) * k;
        }

        const posArr = geometry.attributes.position.array;
        const sizeArr = geometry.attributes.aSize.array;
        const alphaArr = geometry.attributes.aAlpha.array;

        for (let i = 0; i < TRAIL_LEN; i++) {
            const t = i / TRAIL_LEN;
            posArr[i * 3] = chain[i].x;
            posArr[i * 3 + 1] = chain[i].y;
            posArr[i * 3 + 2] = chain[i].z;
            sizeArr[i] = (1 - t) * (1 - t) * 3.5;
            alphaArr[i] = Math.pow(1 - t, 1.5);
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.aSize.needsUpdate = true;
        geometry.attributes.aAlpha.needsUpdate = true;
    });

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ---- Sparkles: tiny particles shedding off the trail ----
const SPARK_COUNT = 24;
function Sparkles({ posRef }) {
    const meshRef = useRef();
    const sparks = useRef([]);

    const { geometry, material } = useMemo(() => {
        const positions = new Float32Array(SPARK_COUNT * 3);
        const alphas = new Float32Array(SPARK_COUNT);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

        const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: /* glsl */ `
                attribute float aAlpha;
                varying float vAlpha;
                uniform float uPixelRatio;
                void main() {
                    vAlpha = aAlpha;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aAlpha * uPixelRatio * (40.0 / -mv.z);
                }
            `,
            fragmentShader: /* glsl */ `
                varying float vAlpha;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    if (d > 0.5) discard;
                    gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha * smoothstep(0.5, 0.0, d) * 0.6);
                }
            `,
        });

        // Initialize spark data
        for (let i = 0; i < SPARK_COUNT; i++) {
            sparks.current.push({
                x: 0, y: 0, z: 0,
                vx: 0, vy: 0,
                life: 0, maxLife: 0,
            });
        }

        return { geometry: geo, material: mat };
    }, []);

    useFrame((_, delta) => {
        if (!posRef.current) return;
        const dt = Math.min(0.1, delta);
        const px = posRef.current.x;
        const py = posRef.current.y;

        const posArr = geometry.attributes.position.array;
        const alphaArr = geometry.attributes.aAlpha.array;

        for (let i = 0; i < SPARK_COUNT; i++) {
            const s = sparks.current[i];
            s.life -= dt;

            if (s.life <= 0) {
                // Respawn at comet position with random velocity
                s.x = px + (Math.random() - 0.5) * 0.5;
                s.y = py + (Math.random() - 0.5) * 0.5;
                s.z = (Math.random() - 0.5) * 0.3;
                s.vx = (Math.random() - 0.5) * 2;
                s.vy = (Math.random() - 0.5) * 2;
                s.maxLife = 0.6 + Math.random() * 1.2;
                s.life = s.maxLife;
            }

            // Drift + slow down
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.vx *= 0.97;
            s.vy *= 0.97;

            posArr[i * 3] = s.x;
            posArr[i * 3 + 1] = s.y;
            posArr[i * 3 + 2] = s.z;
            alphaArr[i] = Math.max(0, s.life / s.maxLife);
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.aAlpha.needsUpdate = true;
    });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}

// ---- Path logic ----
function smoothstep(x) {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
}

function Comet({ isMobile }) {
    const groupRef = useRef();
    const posRef = useRef({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();
    const { camera, size } = useThree();

    const sp = useSpring(scrollYProgress, {
        damping: 55,
        stiffness: 45,
        mass: 1.5,
    });

    function getWorldHalf() {
        const fovRad = (camera.fov * Math.PI) / 180;
        const halfH = Math.tan(fovRad / 2) * Math.abs(camera.position.z);
        return { halfW: halfH * (size.width / size.height), halfH };
    }
    function clientToWorld(cx, cy) {
        const { halfW, halfH } = getWorldHalf();
        return {
            x: ((cx / size.width) * 2 - 1) * halfW,
            y: -(((cy / size.height) * 2 - 1)) * halfH,
        };
    }

    // Comet size (world units, not model scale — the head is 0.35 radius)
    const COMET_S = isMobile ? 0.5 : 0.7;
    const ORBIT_S = isMobile ? 0.35 : 0.45;
    const JOURNEY_S = isMobile ? 0.3 : 0.4;

    // DOM tracking
    const orbitRect = useRef({ cx: 0, cy: 0, present: false });
    const journeyRect = useRef({ cx: 0, top: 0, bottom: 0, height: 0, present: false });

    useEffect(() => {
        const orbitEl = document.querySelector(ORBIT_SELECTOR);
        const journeyEl = document.querySelector(JOURNEY_SELECTOR);
        const update = () => {
            if (orbitEl) {
                const r = orbitEl.getBoundingClientRect();
                orbitRect.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, present: true };
            }
            if (journeyEl) {
                const r = journeyEl.getBoundingClientRect();
                journeyRect.current = { cx: r.left + r.width / 2, top: r.top, bottom: r.bottom, height: r.height, present: true };
            }
        };
        update();
        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
        if (orbitEl) ro?.observe(orbitEl);
        if (journeyEl) ro?.observe(journeyEl);
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => { ro?.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
    }, []);

    const angleRef = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const dt = Math.min(0.1, delta);
        const t = state.clock.getElapsedTime();
        const scrollT = sp.get();
        const { halfW, halfH } = getWorldHalf();

        // ======== DEFAULT: lissajous drift (more dynamic) ========
        const rX = halfW * (isMobile ? 0.4 : 0.5);
        const swingX = halfW * (isMobile ? 0.15 : 0.18);
        const swingY = halfH * (isMobile ? 0.08 : 0.1);
        const dX = rX + Math.sin(t * 0.3 + scrollT * Math.PI * 2) * swingX
                      + Math.sin(t * 0.7) * swingX * 0.3;
        const dY = halfH * 0.4 - scrollT * halfH * 1.5
                 + Math.sin(t * 0.4) * swingY
                 + Math.cos(t * 0.25) * swingY * 0.5;

        // ======== ORBIT (Stack) — wide ellipse outside pills ========
        let oBlend = 0;
        if (orbitRect.current.present) {
            const dist = Math.abs(orbitRect.current.cy - size.height / 2);
            oBlend = smoothstep(Math.max(0, 1 - dist / (size.height * 0.42)));
        }
        const oC = orbitRect.current.present
            ? clientToWorld(orbitRect.current.cx, orbitRect.current.cy)
            : { x: 0, y: 0 };
        const oRx = isMobile ? 5 : halfW * 0.24;
        const oRy = oRx * 0.5;
        // Vary orbit speed slightly for organic feel
        const orbitSpeed = 1.1 + Math.sin(t * 0.2) * 0.15;
        if (oBlend > 0.01) angleRef.current += dt * orbitSpeed;
        const oX = oC.x + Math.cos(angleRef.current) * oRx;
        const oY = oC.y + Math.sin(angleRef.current) * oRy;

        // ======== JOURNEY (Timeline weave) ========
        let jBlend = 0;
        const jc = journeyRect.current;
        if (jc.present) {
            const vT = Math.max(0, Math.min(1, (size.height - jc.top) / size.height));
            const vB = Math.max(0, Math.min(1, jc.bottom / size.height));
            jBlend = smoothstep(Math.max(0, (Math.min(vT, vB) - 0.15) / 0.85));
        }
        const jProg = jc.present
            ? Math.max(0, Math.min(1, (size.height / 2 - jc.top) / Math.max(1, jc.height)))
            : 0;
        const jC = jc.present ? clientToWorld(jc.cx, jc.top + jc.height * jProg) : { x: 0, y: 0 };
        const wA = isMobile ? 2.5 : 6;
        const jX = jC.x + Math.sin(jProg * Math.PI * 5) * wA;
        const jY = jC.y;

        // ======== BLEND ========
        const spec = Math.min(1, oBlend + jBlend);
        const jW = jBlend;
        const oW = Math.max(0, spec - jBlend);
        const dW = 1 - spec;

        const targetX = dX * dW + oX * oW + jX * jW;
        const targetY = dY * dW + oY * oW + jY * jW;
        const targetS = COMET_S * dW + ORBIT_S * oW + JOURNEY_S * jW;

        // ======== APPLY ========
        const posK = 1 - Math.exp(-8 * dt);
        const g = groupRef.current;
        g.position.x += (targetX - g.position.x) * posK;
        g.position.y += (targetY - g.position.y) * posK;
        // Subtle z-bobbing for depth
        g.position.z = Math.sin(t * 0.6) * 1.5;

        const scK = 1 - Math.exp(-5 * dt);
        const ns = g.scale.x + (targetS - g.scale.x) * scK;
        g.scale.set(ns, ns, ns);

        // Feed position to trail/sparkles
        posRef.current.x = g.position.x;
        posRef.current.y = g.position.y;
    });

    // Initial position off-screen right
    const initX = (() => {
        const fovRad = (75 * Math.PI) / 180;
        const hH = Math.tan(fovRad / 2) * 50;
        const hW = hH * (typeof window !== "undefined" ? window.innerWidth / window.innerHeight : 1.7);
        return hW * 0.55;
    })();

    return (
        <>
            <group ref={groupRef} position={[initX, 15, 0]} scale={COMET_S}>
                <CometHead />
            </group>
            <CometTrail posRef={posRef} />
            <Sparkles posRef={posRef} />
            {/* Glow light — follows the comet */}
            <GlowLight posRef={posRef} />
        </>
    );
}

function GlowLight({ posRef }) {
    const ref = useRef();
    useFrame(() => {
        if (!posRef.current || !ref.current) return;
        ref.current.position.set(posRef.current.x, posRef.current.y, 3);
    });
    return <pointLight ref={ref} color="#44ccdd" intensity={15} distance={30} decay={2} />;
}

export default function RocketCompanion() {
    const isMobile = useIsMobile();
    return (
        <div
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 1 }}
            aria-hidden
        >
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                frameloop="always"
            >
                <Suspense fallback={null}>
                    <Comet isMobile={isMobile} />
                </Suspense>
            </Canvas>
        </div>
    );
}
