import { motion } from "motion/react";
import { cn } from "../../../lib/cn";

/**
 * Cosmic key — looks like a beacon with a glowing tip and a comet trail.
 */
export default function Key({ inserted = false, className, size = 240 }) {
    return (
        <motion.svg
            viewBox="0 0 260 100"
            width={size}
            height={size * 0.38}
            className={cn(
                "drop-shadow-[0_8px_40px_rgba(51,194,204,0.4)]",
                className,
            )}
            animate={
                inserted
                    ? { rotate: -10, x: 4 }
                    : { rotate: [-2, 2, -2] }
            }
            transition={
                inserted
                    ? { type: "spring", stiffness: 140, damping: 14 }
                    : { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }
            aria-hidden
        >
            <defs>
                <linearGradient id="key-shaft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#33c2cc" />
                    <stop offset="55%" stopColor="#7a57db" />
                    <stop offset="100%" stopColor="#ca2f8c" />
                </linearGradient>
                <radialGradient id="key-bead" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a4f1ff" />
                    <stop offset="40%" stopColor="#33c2cc" />
                    <stop offset="100%" stopColor="#1b3b66" />
                </radialGradient>
                <linearGradient id="key-trail" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#33c2cc" stopOpacity="0" />
                    <stop offset="100%" stopColor="#33c2cc" stopOpacity="0.5" />
                </linearGradient>
            </defs>

            {/* comet trail */}
            <motion.path
                d="M 0 50 Q 30 50 60 50"
                stroke="url(#key-trail)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={
                    inserted
                        ? { opacity: 0 }
                        : { opacity: [0.3, 0.7, 0.3] }
                }
                transition={
                    inserted
                        ? { duration: 0.3 }
                        : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
                }
            />

            {/* head — bead with halo */}
            <circle cx="80" cy="50" r="36" fill="rgba(51,194,204,0.08)" />
            <circle cx="80" cy="50" r="28" fill="url(#key-bead)" />
            <circle cx="80" cy="50" r="11" fill="#06091f" stroke="rgba(122,223,242,0.5)" strokeWidth="1" />
            {/* highlight on head */}
            <circle cx="70" cy="42" r="5" fill="rgba(255,255,255,0.4)" />

            {/* shaft */}
            <rect x="106" y="44" width="135" height="12" rx="3" fill="url(#key-shaft)" />

            {/* teeth */}
            <rect x="200" y="56" width="10" height="20" fill="url(#key-shaft)" rx="2" />
            <rect x="220" y="56" width="8" height="14" fill="url(#key-shaft)" rx="2" />

            {/* tip glow */}
            <circle cx="245" cy="50" r="6" fill="#a4f1ff" opacity="0.85" />
            <circle cx="245" cy="50" r="11" fill="#a4f1ff" opacity="0.25" />
        </motion.svg>
    );
}
