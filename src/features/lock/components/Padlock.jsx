import { motion } from "motion/react";
import { cn } from "../../../lib/cn";

/**
 * Cosmic padlock — body painted like a dark planet (craters, gradient,
 * subtle ring) with a neon shackle. `progress` (0–1) lifts the shackle
 * and brightens the keyhole; `unlocked` opens fully.
 */
export default function Padlock({ unlocked = false, progress = 0, className, size = 180 }) {
    const lift = unlocked ? -16 : -progress * 8;
    const rot = unlocked ? -34 : -progress * 22;
    const keyholeGlow = 0.15 + progress * 0.85;

    return (
        <svg
            viewBox="0 0 160 200"
            width={size}
            height={size * 1.25}
            className={cn(
                "drop-shadow-[0_10px_60px_rgba(122,87,219,0.45)]",
                className,
            )}
            aria-hidden
        >
            <defs>
                <radialGradient id="planet-body" cx="40%" cy="35%" r="75%">
                    <stop offset="0%" stopColor="#3b3a6e" />
                    <stop offset="55%" stopColor="#1b1c3c" />
                    <stop offset="100%" stopColor="#06091f" />
                </radialGradient>
                <linearGradient id="shackle" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#33c2cc" />
                    <stop offset="100%" stopColor="#7a57db" />
                </linearGradient>
                <radialGradient id="keyhole-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7adff2" stopOpacity={keyholeGlow} />
                    <stop offset="60%" stopColor="#7adff2" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="aura" cx="50%" cy="60%" r="50%">
                    <stop offset="0%" stopColor="#7a57db" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7a57db" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* aura */}
            <circle cx="80" cy="130" r="80" fill="url(#aura)" />

            {/* shackle — pivots on right base post */}
            <motion.g
                animate={{ rotate: rot, y: lift }}
                style={{ transformOrigin: "110px 100px" }}
                transition={{ type: "spring", stiffness: 140, damping: 14 }}
            >
                <path
                    d="M 50 100 L 50 65 A 30 30 0 0 1 110 65 L 110 100"
                    fill="none"
                    stroke="url(#shackle)"
                    strokeWidth="11"
                    strokeLinecap="round"
                />
                <path
                    d="M 50 100 L 50 65 A 30 30 0 0 1 110 65 L 110 100"
                    fill="none"
                    stroke="rgba(122,223,242,0.45)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </motion.g>

            {/* planet body */}
            <g>
                <circle cx="80" cy="135" r="55" fill="url(#planet-body)" />
                {/* highlight rim */}
                <circle
                    cx="80"
                    cy="135"
                    r="55"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                />
                {/* craters */}
                <circle cx="100" cy="120" r="3.5" fill="rgba(255,255,255,0.05)" />
                <circle cx="62" cy="148" r="2.5" fill="rgba(255,255,255,0.06)" />
                <circle cx="92" cy="162" r="4" fill="rgba(255,255,255,0.04)" />
                <circle cx="55" cy="120" r="1.8" fill="rgba(255,255,255,0.07)" />
                <circle cx="113" cy="142" r="2" fill="rgba(255,255,255,0.05)" />
            </g>

            {/* Saturn-like ring */}
            <ellipse
                cx="80"
                cy="135"
                rx="68"
                ry="10"
                fill="none"
                stroke="rgba(122, 87, 219, 0.35)"
                strokeWidth="1.2"
                transform="rotate(-15 80 135)"
            />
            <ellipse
                cx="80"
                cy="135"
                rx="68"
                ry="10"
                fill="none"
                stroke="rgba(51, 194, 204, 0.18)"
                strokeWidth="0.8"
                strokeDasharray="2 6"
                transform="rotate(-15 80 135)"
            />

            {/* keyhole */}
            <circle cx="80" cy="130" r="14" fill="url(#keyhole-glow)" />
            <circle cx="80" cy="130" r="6" fill="#06091f" stroke="rgba(122,223,242,0.6)" strokeWidth="1" />
            <rect x="77" y="132" width="6" height="14" rx="2" fill="#06091f" stroke="rgba(122,223,242,0.5)" strokeWidth="1" />
        </svg>
    );
}
