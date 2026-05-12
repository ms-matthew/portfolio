import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Padlock from "./Padlock";
import Key from "./Key";
import { cn } from "../../../lib/cn";

const TAP_DURATION_MS = 1000;

export default function MobileLockOverlay({ onUnlock }) {
    const [phase, setPhase] = useState("idle"); // idle → inserting → done

    const handleTap = () => {
        if (phase !== "idle") return;
        setPhase("inserting");
        setTimeout(() => {
            setPhase("done");
            onUnlock();
        }, TAP_DURATION_MS);
    };

    const unlocked = phase !== "idle";
    const progress = unlocked ? 1 : 0;

    return (
        <div className="relative grid min-h-svh place-items-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex w-full max-w-sm flex-col items-center text-center"
            >
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-lavender/80">
                    entry required
                </p>

                <div className="relative mt-6 h-[220px] w-[240px]">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2">
                        <Padlock progress={progress} unlocked={unlocked} size={150} />
                    </div>

                    <AnimatePresence>
                        {phase === "idle" && (
                            <motion.div
                                key="key"
                                className="absolute bottom-0 left-1/2"
                                initial={{ x: "-50%", opacity: 0 }}
                                animate={{
                                    x: "-50%",
                                    opacity: 1,
                                    y: [0, 6, 0],
                                }}
                                exit={{
                                    x: "-18%",
                                    y: -145,
                                    rotate: -8,
                                    opacity: 0,
                                    transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] },
                                }}
                                transition={{
                                    opacity: { duration: 0.3 },
                                    y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                                }}
                            >
                                <Key size={160} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight">
                    Entry requires two windows —
                    <br />
                    but you're on a phone.
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
                    So here's a shortcut: tap, and the key slides in on its own.
                </p>

                <button
                    onClick={handleTap}
                    disabled={phase !== "idle"}
                    className={cn(
                        "mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3",
                        "bg-gradient-to-r from-royal to-lavender text-sm font-medium text-white",
                        "active:translate-y-[1px] transition duration-200",
                        "shadow-[0_10px_30px_rgba(92,51,204,0.45)]",
                        "disabled:opacity-60",
                    )}
                >
                    {phase === "idle" ? "Slide the key" : "Unlocking…"}
                </button>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                    open on desktop for the real trick
                </p>
            </motion.div>
        </div>
    );
}
