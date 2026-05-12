import { useRef, useState } from "react";
import { motion } from "motion/react";
import Padlock from "./Padlock";
import { KEY_WINDOW } from "../constants";
import { cn } from "../../../lib/cn";

export default function LockOverlay({ progress, hasPartner }) {
    const childRef = useRef(null);
    const [spawned, setSpawned] = useState(false);

    const openKeyWindow = () => {
        if (childRef.current && !childRef.current.closed) {
            childRef.current.focus();
            return;
        }
        const base = import.meta.env.BASE_URL ?? "/";
        const url = `${base}?mode=${KEY_WINDOW.mode}`;
        const features = [
            `width=${KEY_WINDOW.width}`,
            `height=${KEY_WINDOW.height}`,
            `left=${Math.max(0, window.screenX + window.innerWidth - 80)}`,
            `top=${Math.max(0, window.screenY + 80)}`,
        ].join(",");
        childRef.current = window.open(url, KEY_WINDOW.name, features);
        setSpawned(true);
    };

    return (
        <div className="relative grid place-items-center min-h-svh px-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.2, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl"
            >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
                    <LockVisual progress={progress} />

                    <div className="text-center lg:text-left">
                        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-lavender/80">
                            entry required
                        </p>

                        <h2 className="relative mt-3 inline-block text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                            You'll need{" "}
                            <span className="relative inline-block">
                                two windows
                                <Scribble />
                            </span>{" "}
                            to get in.
                        </h2>

                        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-neutral-400 lg:mx-0">
                            Open the second window, then pick it up by the title bar and
                            drop it on top of this one. The closer their centres get, the
                            further the lock opens. It's a desktop trick — works best on a
                            big screen.
                        </p>

                        <Steps spawned={spawned} hasPartner={hasPartner} progress={progress} />

                        <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
                            <button
                                onClick={openKeyWindow}
                                className={cn(
                                    "group inline-flex items-center gap-2 rounded-full px-6 py-3",
                                    "bg-gradient-to-r from-royal to-lavender text-white text-sm font-medium",
                                    "hover:-translate-y-0.5 transition duration-200",
                                    "shadow-[0_10px_30px_rgba(92,51,204,0.45)]",
                                )}
                            >
                                {spawned && hasPartner ? "Re-focus key window" : "Open key window"}
                                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden className="transition group-hover:translate-x-0.5">
                                    <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <button
                                onClick={() => window.scrollTo({ top: 0 })}
                                className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500 hover:text-neutral-300 transition"
                                style={{ visibility: "hidden" }}
                                aria-hidden
                            >
                                spacer
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function LockVisual({ progress }) {
    const RADIUS = 108;
    const CIRC = 2 * Math.PI * RADIUS;

    return (
        <div className="relative grid h-[260px] w-[260px] place-items-center md:h-[300px] md:w-[300px]">
            {/* Orbiting progress ring */}
            <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 240 240"
                aria-hidden
            >
                <defs>
                    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#33c2cc" />
                        <stop offset="100%" stopColor="#7a57db" />
                    </linearGradient>
                </defs>
                <circle
                    cx="120"
                    cy="120"
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="2"
                />
                <motion.circle
                    cx="120"
                    cy="120"
                    r={RADIUS}
                    fill="none"
                    stroke="url(#ring)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    animate={{ strokeDashoffset: CIRC * (1 - progress) }}
                    transition={{ type: "tween", duration: 0.15 }}
                />
                {/* tick marks */}
                {Array.from({ length: 24 }).map((_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const r1 = RADIUS - 10;
                    const r2 = RADIUS - 4;
                    const x1 = 120 + Math.cos(angle) * r1;
                    const y1 = 120 + Math.sin(angle) * r1;
                    const x2 = 120 + Math.cos(angle) * r2;
                    const y2 = 120 + Math.sin(angle) * r2;
                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1"
                        />
                    );
                })}
            </svg>

            <motion.div
                animate={{
                    y: [0, -5, 0],
                    rotate: progress > 0.4 ? [0, -1.5, 1.5, 0] : 0,
                }}
                transition={{
                    y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                        duration: 0.4,
                        repeat: progress > 0.4 ? Infinity : 0,
                    },
                }}
            >
                <Padlock progress={progress} size={160} />
            </motion.div>

            {/* floating coordinate label — a little flourish */}
            <div className="absolute -bottom-1 right-0 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                x: {(progress * 100).toFixed(0).padStart(3, "0")}
            </div>
        </div>
    );
}

function Steps({ spawned, hasPartner, progress }) {
    const states = [
        { done: spawned, label: "Open the key window" },
        { done: hasPartner, label: "Pick it up and drag it over here" },
        { done: progress >= 1, label: "Line up the centres" },
    ];

    return (
        <ol className="mx-auto mt-7 max-w-sm space-y-2 text-left lg:mx-0">
            {states.map((s, i) => (
                <li
                    key={i}
                    className={cn(
                        "flex items-start gap-3 font-mono text-[13px] transition-colors duration-500",
                        s.done ? "text-neutral-200" : "text-neutral-500",
                    )}
                >
                    <span
                        className={cn(
                            "mt-0.5 grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full border text-[10px]",
                            s.done
                                ? "border-aqua bg-aqua/10 text-aqua"
                                : "border-white/15 text-neutral-500",
                        )}
                    >
                        {s.done ? "✓" : i + 1}
                    </span>
                    <span>{s.label}</span>
                </li>
            ))}
        </ol>
    );
}

function Scribble() {
    return (
        <svg
            className="pointer-events-none absolute -bottom-2 left-0 w-full"
            viewBox="0 0 160 12"
            fill="none"
            aria-hidden
        >
            <motion.path
                d="M2 7 Q 30 2 60 6 T 120 5 T 158 8"
                stroke="#7a57db"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
            />
        </svg>
    );
}
