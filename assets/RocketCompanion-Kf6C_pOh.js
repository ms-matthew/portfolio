import{j as o,C as ut,r as p,u as pt,a as E}from"./r3f-CWxIzNbl.js";import{u as dt,a as ft,b as mt}from"./index-WrNUw-hX.js";import{j as C,k as J,l as S,m as V}from"./three-CNdzEJyR.js";import"./react-DJG_os-6.js";import"./motion-CNObUWhB.js";const xt=".orbit-stage",gt=".journey-stage",j=80;function vt(){return o.jsxs("group",{children:[o.jsxs("mesh",{children:[o.jsx("icosahedronGeometry",{args:[.35,2]}),o.jsx("meshBasicMaterial",{color:"#ffffff"})]}),o.jsxs("mesh",{children:[o.jsx("icosahedronGeometry",{args:[.8,2]}),o.jsx("meshBasicMaterial",{color:"#55ddee",transparent:!0,opacity:.18,blending:C,depthWrite:!1})]}),o.jsxs("mesh",{children:[o.jsx("icosahedronGeometry",{args:[1.6,1]}),o.jsx("meshBasicMaterial",{color:"#7a57db",transparent:!0,opacity:.06,blending:C,depthWrite:!1})]})]})}function yt({posRef:n}){const i=p.useRef(),x=p.useRef(null),v=p.useRef(!1),{geometry:g,material:l}=p.useMemo(()=>{const R=new Float32Array(j*3),d=new Float32Array(j),y=new Float32Array(j),h=new J;h.setAttribute("position",new S(R,3)),h.setAttribute("aSize",new S(d,1)),h.setAttribute("aAlpha",new S(y,1));const M=new V({transparent:!0,depthWrite:!1,blending:C,uniforms:{uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
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
            `,fragmentShader:`
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
            `});return{geometry:h,material:M}},[]);return E((R,d)=>{if(!n.current||!i.current)return;const y=Math.min(.1,d),h=n.current.x,M=n.current.y;if(!v.current){x.current=[];for(let e=0;e<j;e++)x.current.push({x:h,y:M,z:0});v.current=!0}const u=x.current;u[0].x=h,u[0].y=M;for(let e=1;e<j;e++){const f=18*(1-e/j*.7),c=1-Math.exp(-f*y);u[e].x+=(u[e-1].x-u[e].x)*c,u[e].y+=(u[e-1].y-u[e].y)*c}const r=g.attributes.position.array,t=g.attributes.aSize.array,b=g.attributes.aAlpha.array;for(let e=0;e<j;e++){const a=e/j;r[e*3]=u[e].x,r[e*3+1]=u[e].y,r[e*3+2]=u[e].z,t[e]=(1-a)*(1-a)*3.5,b[e]=Math.pow(1-a,1.5)}g.attributes.position.needsUpdate=!0,g.attributes.aSize.needsUpdate=!0,g.attributes.aAlpha.needsUpdate=!0}),o.jsx("points",{ref:i,geometry:g,material:l})}const P=24;function Mt({posRef:n}){const i=p.useRef(),x=p.useRef([]),{geometry:v,material:g}=p.useMemo(()=>{const l=new Float32Array(P*3),R=new Float32Array(P),d=new J;d.setAttribute("position",new S(l,3)),d.setAttribute("aAlpha",new S(R,1));const y=new V({transparent:!0,depthWrite:!1,blending:C,uniforms:{uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
                attribute float aAlpha;
                varying float vAlpha;
                uniform float uPixelRatio;
                void main() {
                    vAlpha = aAlpha;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = aAlpha * uPixelRatio * (40.0 / -mv.z);
                }
            `,fragmentShader:`
                varying float vAlpha;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    if (d > 0.5) discard;
                    gl_FragColor = vec4(0.7, 0.9, 1.0, vAlpha * smoothstep(0.5, 0.0, d) * 0.6);
                }
            `});for(let h=0;h<P;h++)x.current.push({x:0,y:0,z:0,vx:0,vy:0,life:0,maxLife:0});return{geometry:d,material:y}},[]);return E((l,R)=>{if(!n.current)return;const d=Math.min(.1,R),y=n.current.x,h=n.current.y,M=v.attributes.position.array,u=v.attributes.aAlpha.array;for(let r=0;r<P;r++){const t=x.current[r];t.life-=d,t.life<=0&&(t.x=y+(Math.random()-.5)*.5,t.y=h+(Math.random()-.5)*.5,t.z=(Math.random()-.5)*.3,t.vx=(Math.random()-.5)*2,t.vy=(Math.random()-.5)*2,t.maxLife=.6+Math.random()*1.2,t.life=t.maxLife),t.x+=t.vx*d,t.y+=t.vy*d,t.vx*=.97,t.vy*=.97,M[r*3]=t.x,M[r*3+1]=t.y,M[r*3+2]=t.z,u[r]=Math.max(0,t.life/t.maxLife)}v.attributes.position.needsUpdate=!0,v.attributes.aAlpha.needsUpdate=!0}),o.jsx("points",{ref:i,geometry:v,material:g})}function q(n){const i=Math.max(0,Math.min(1,n));return i*i*(3-2*i)}function wt({isMobile:n}){const i=p.useRef(),x=p.useRef({x:0,y:0}),{scrollYProgress:v}=ft(),{camera:g,size:l}=pt(),R=mt(v,{damping:55,stiffness:45,mass:1.5});function d(){const a=g.fov*Math.PI/180,f=Math.tan(a/2)*Math.abs(g.position.z);return{halfW:f*(l.width/l.height),halfH:f}}function y(a,f){const{halfW:c,halfH:s}=d();return{x:(a/l.width*2-1)*c,y:-(f/l.height*2-1)*s}}const h=n?.5:.7,M=n?.35:.45,u=n?.3:.4,r=p.useRef({cx:0,cy:0,present:!1}),t=p.useRef({cx:0,top:0,bottom:0,height:0,present:!1});p.useEffect(()=>{const a=document.querySelector(xt),f=document.querySelector(gt),c=()=>{if(a){const m=a.getBoundingClientRect();r.current={cx:m.left+m.width/2,cy:m.top+m.height/2,present:!0}}if(f){const m=f.getBoundingClientRect();t.current={cx:m.left+m.width/2,top:m.top,bottom:m.bottom,height:m.height,present:!0}}};c();const s=typeof ResizeObserver<"u"?new ResizeObserver(c):null;return a&&(s==null||s.observe(a)),f&&(s==null||s.observe(f)),window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),()=>{s==null||s.disconnect(),window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}},[]);const b=p.useRef(0);E((a,f)=>{if(!i.current)return;const c=Math.min(.1,f),s=a.clock.getElapsedTime(),m=R.get(),{halfW:_,halfH:W}=d(),D=_*(n?.4:.5),H=_*(n?.15:.18),U=W*(n?.08:.1),Q=D+Math.sin(s*.3+m*Math.PI*2)*H+Math.sin(s*.7)*H*.3,Z=W*.4-m*W*1.5+Math.sin(s*.4)*U+Math.cos(s*.25)*U*.5;let L=0;if(r.current.present){const I=Math.abs(r.current.cy-l.height/2);L=q(Math.max(0,1-I/(l.height*.42)))}const Y=r.current.present?y(r.current.cx,r.current.cy):{x:0,y:0},k=n?5:_*.24,$=k*.5,tt=1.1+Math.sin(s*.2)*.15;L>.01&&(b.current+=c*tt);const et=Y.x+Math.cos(b.current)*k,nt=Y.y+Math.sin(b.current)*$;let z=0;const w=t.current;if(w.present){const I=Math.max(0,Math.min(1,(l.height-w.top)/l.height)),ht=Math.max(0,Math.min(1,w.bottom/l.height));z=q(Math.max(0,(Math.min(I,ht)-.15)/.85))}const X=w.present?Math.max(0,Math.min(1,(l.height/2-w.top)/Math.max(1,w.height))):0,G=w.present?y(w.cx,w.top+w.height*X):{x:0,y:0},ot=n?2.5:6,rt=G.x+Math.sin(X*Math.PI*5)*ot,st=G.y,N=Math.min(1,L+z),B=z,T=Math.max(0,N-z),O=1-N,at=Q*O+et*T+rt*B,it=Z*O+nt*T+st*B,ct=h*O+M*T+u*B,K=1-Math.exp(-8*c),A=i.current;A.position.x+=(at-A.position.x)*K,A.position.y+=(it-A.position.y)*K,A.position.z=Math.sin(s*.6)*1.5;const lt=1-Math.exp(-5*c),F=A.scale.x+(ct-A.scale.x)*lt;A.scale.set(F,F,F),x.current.x=A.position.x,x.current.y=A.position.y});const e=(()=>{const a=75*Math.PI/180;return Math.tan(a/2)*50*(typeof window<"u"?window.innerWidth/window.innerHeight:1.7)*.55})();return o.jsxs(o.Fragment,{children:[o.jsx("group",{ref:i,position:[e,15,0],scale:h,children:o.jsx(vt,{})}),o.jsx(yt,{posRef:x}),o.jsx(Mt,{posRef:x}),o.jsx(At,{posRef:x})]})}function At({posRef:n}){const i=p.useRef();return E(()=>{!n.current||!i.current||i.current.position.set(n.current.x,n.current.y,3)}),o.jsx("pointLight",{ref:i,color:"#44ccdd",intensity:15,distance:30,decay:2})}function Pt(){const n=dt();return o.jsx("div",{className:"pointer-events-none fixed inset-0",style:{zIndex:1},"aria-hidden":!0,children:o.jsx(ut,{camera:{position:[0,0,50],fov:75},dpr:[1,1.5],gl:{alpha:!0,antialias:!0,powerPreference:"high-performance"},frameloop:"always",children:o.jsx(p.Suspense,{fallback:null,children:o.jsx(wt,{isMobile:n})})})})}export{Pt as default};
