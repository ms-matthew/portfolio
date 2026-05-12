import { motion, AnimatePresence } from "motion/react";
import Key from "./Key";
import Padlock from "./Padlock";
import { useWindowSync } from "../hooks/useWindowSync";

export default function KeyWindow() {
    const { myBounds, otherBounds, unlocked, hasPartner, progress } =
        useWindowSync("child");

    if (unlocked) return <Unlocked hasPartner={hasPartner} />;

    const ghost = myBounds && otherBounds
        ? {
              left: otherBounds.x - myBounds.x,
              top: otherBounds.y - myBounds.y,
              width: otherBounds.w,
              height: otherBounds.h,
          }
        : null;

    return (
        <div className="relative min-h-svh overflow-hidden bg-primary text-white">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 30%, rgba(122, 87, 219, 0.22), transparent 60%)",
                }}
            />

            {ghost && (
                <div
                    className="pointer-events-none absolute rounded-lg border border-dashed border-lavender/45 bg-lavender/[0.04] transition-colors"
                    style={{
                        left: ghost.left,
                        top: ghost.top,
                        width: ghost.width,
                        height: ghost.height,
                    }}
                >
                    <span className="absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                        portfolio window
                    </span>
                    <div className="absolute inset-0 grid place-items-center opacity-60">
                        <Padlock progress={progress} size={90} />
                    </div>
                </div>
            )}

            <div className="relative z-10 grid min-h-svh place-items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm rounded-2xl border border-white/10 bg-primary/60 px-8 py-10 backdrop-blur"
                >
                    <Key />
                    <h2 className="mt-4 text-2xl font-bold">The key</h2>
                    <p className="mt-2 text-sm text-neutral-400">
                        {!hasPartner
                            ? "Can't find the portfolio window — is it still open?"
                            : "Drag this window on top of the portfolio window."}
                    </p>

                    <div
                        className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10"
                        aria-hidden
                    >
                        <motion.div
                            className="h-full origin-left bg-gradient-to-r from-aqua to-lavender"
                            animate={{ scaleX: progress }}
                            transition={{ type: "tween", duration: 0.12 }}
                        />
                    </div>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                        {hasPartner ? `${(progress * 100).toFixed(0)}% aligned` : "—"}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

function Unlocked({ hasPartner }) {
    const close = () => window.close();

    return (
        <div className="relative grid min-h-svh place-items-center bg-primary px-6 text-center text-white">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 30%, rgba(51, 194, 204, 0.22), transparent 60%)",
                }}
            />
            <AnimatePresence>
                <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.2, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-primary/70 px-8 py-12 backdrop-blur"
                >
                    <motion.svg
                        viewBox="0 0 48 48"
                        width="64"
                        height="64"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
                        className="mx-auto text-aqua"
                        aria-hidden
                    >
                        <circle cx="24" cy="24" r="22" fill="rgba(51,194,204,0.12)" stroke="currentColor" strokeWidth="2" />
                        <motion.path
                            d="M14 25 L21 32 L34 17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.4, duration: 0.45 }}
                        />
                    </motion.svg>
                    <h2 className="mt-5 text-3xl font-bold">Unlocked</h2>
                    <p className="mt-2 text-sm text-neutral-400">
                        {hasPartner
                            ? "The portfolio is open in the other window."
                            : "Portfolio window is gone, but the page is unlocked."}
                    </p>
                    <button
                        onClick={close}
                        className="mt-6 rounded-full bg-gradient-to-r from-royal to-lavender px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
                    >
                        Close this window
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
