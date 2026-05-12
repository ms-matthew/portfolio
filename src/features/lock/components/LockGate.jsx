import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import LockOverlay from "./LockOverlay";
import MobileLockOverlay from "./MobileLockOverlay";
import { useWindowSync } from "../hooks/useWindowSync";
import { useIsMobile } from "../../../hooks/useMediaQuery";
import { LockProvider } from "../context.jsx";
import { cn } from "../../../lib/cn";

export default function LockGate({ children }) {
    const { unlocked, hasPartner, progress, relock, unlock } = useWindowSync("main");
    const isMobile = useIsMobile();

    useEffect(() => {
        document.body.classList.toggle("pc-unlocked", unlocked);
    }, [unlocked]);

    useEffect(() => {
        if (!unlocked) return;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        const id = setTimeout(() => {
            document.documentElement.style.scrollBehavior = "smooth";
        }, 50);
        return () => clearTimeout(id);
    }, [unlocked]);

    return (
        <LockProvider value={{ unlocked, hasPartner, progress, unlock, relock }}>
            <div
                className={cn(
                    "transition-[filter,transform,opacity] duration-[900ms] ease-out",
                    !unlocked && "blur-2xl scale-[1.03] pointer-events-none select-none",
                )}
                aria-hidden={!unlocked}
            >
                {children}
            </div>

            <AnimatePresence>
                {!unlocked && (
                    <motion.div
                        key="lock"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 1.4,
                            filter: "blur(20px)",
                            transition: { duration: 0.75, ease: [0.6, 0.05, 0.2, 1] },
                        }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 overflow-hidden bg-primary"
                    >
                        <CosmicBackground />
                        <div className="relative h-full w-full">
                            {isMobile ? (
                                <MobileLockOverlay onUnlock={unlock} />
                            ) : (
                                <LockOverlay progress={progress} hasPartner={hasPartner} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {unlocked && <RelockButton onClick={relock} />}
        </LockProvider>
    );
}

function CosmicBackground() {
    const base = import.meta.env.BASE_URL;
    return (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
            {/* Sky base */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage: `url(${base}assets/sky.jpg)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            />
            {/* Planets parallax */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-screen"
                style={{
                    backgroundImage: `url(${base}assets/planets.png)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    animation: "drift 18s ease-in-out infinite",
                }}
            />
            {/* Star pattern */}
            <svg className="absolute inset-0 h-full w-full opacity-70">
                <defs>
                    <pattern id="stars" width="160" height="160" patternUnits="userSpaceOnUse">
                        <circle cx="12" cy="28" r="0.7" fill="#fff" />
                        <circle cx="90" cy="14" r="1" fill="#fff" />
                        <circle cx="55" cy="72" r="0.5" fill="#fff" />
                        <circle cx="120" cy="96" r="0.8" fill="#c7b3ff" />
                        <circle cx="30" cy="110" r="0.7" fill="#9ae4ea" />
                        <circle cx="78" cy="48" r="0.4" fill="#fff" />
                        <circle cx="145" cy="52" r="0.6" fill="#fff" />
                        <circle cx="20" cy="140" r="0.5" fill="#fff" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#stars)" />
            </svg>
            {/* Foreground vignette + radial focus */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(60% 50% at 50% 42%, rgba(122,87,219,0.30), rgba(3,4,18,0.85) 80%)",
                }}
            />
        </div>
    );
}

function RelockButton({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            title="Lock the page again"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className={cn(
                "fixed top-4 right-4 z-40",
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5",
                "border border-white/10 bg-primary/70 backdrop-blur",
                "font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400",
                "hover:text-white hover:border-lavender/60 transition",
            )}
        >
            <svg viewBox="0 0 24 24" width="13" height="13" className="text-lavender" aria-hidden>
                <path
                    d="M7 10V7a5 5 0 0 1 10 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <rect x="5" y="10" width="14" height="10" rx="2" fill="currentColor" />
            </svg>
            Lock again
        </motion.button>
    );
}
