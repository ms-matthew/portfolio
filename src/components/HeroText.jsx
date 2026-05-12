import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { useI18n } from "../i18n";

const WORK_START = new Date("2025-08-21T00:00:00");

function useWorkDuration() {
    const [duration, setDuration] = useState(() => calcDuration());
    useEffect(() => {
        const id = setInterval(() => setDuration(calcDuration()), 1000);
        return () => clearInterval(id);
    }, []);
    return duration;
}

function calcDuration() {
    const now = new Date();
    let years = now.getFullYear() - WORK_START.getFullYear();
    let months = now.getMonth() - WORK_START.getMonth();
    let days = now.getDate() - WORK_START.getDate();
    if (days < 0) {
        months--;
        const prev = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prev.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    parts.push(`${days}d`);
    return parts.join(" ");
}

function useTypewriter(lines, startDelay = 1000, skip = false) {
    const [displayed, setDisplayed] = useState([]);
    const [cursorLine, setCursorLine] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [phase, setPhase] = useState(skip ? "done" : "waiting");
    const timerRef = useRef(null);

    // If skip, fill all lines immediately
    useEffect(() => {
        if (!skip) return;
        setDisplayed(
            lines.map((l) => ({
                text: l.prompt || l.output || "",
                isPrompt: Boolean(l.prompt),
            }))
        );
        setPhase("done");
    }, [skip, lines]);

    useEffect(() => {
        if (skip) return;
        if (phase === "waiting") {
            timerRef.current = setTimeout(() => setPhase("typing"), startDelay);
            return () => clearTimeout(timerRef.current);
        }
    }, [phase, startDelay, skip]);

    useEffect(() => {
        if (skip || phase !== "typing") return;
        if (cursorLine >= lines.length) {
            setPhase("done");
            return;
        }

        const line = lines[cursorLine];
        const text = line.prompt || line.output || "";
        const speed = line.prompt ? 55 : (line.delay || 30);

        if (charIndex === 0 && displayed.length <= cursorLine) {
            setDisplayed((d) => [
                ...d,
                { text: "", isPrompt: Boolean(line.prompt) },
            ]);
        }

        if (charIndex < text.length) {
            timerRef.current = setTimeout(() => {
                setDisplayed((d) => {
                    const copy = [...d];
                    copy[cursorLine] = {
                        ...copy[cursorLine],
                        text: text.slice(0, charIndex + 1),
                    };
                    return copy;
                });
                setCharIndex((c) => c + 1);
            }, speed);
        } else {
            timerRef.current = setTimeout(() => {
                setCursorLine((l) => l + 1);
                setCharIndex(0);
            }, line.prompt ? 300 : 500);
        }

        return () => clearTimeout(timerRef.current);
    }, [skip, phase, cursorLine, charIndex, lines, displayed.length]);

    return { displayed, phase };
}

function HeroHighlights({ visible }) {
    const { t } = useI18n();
    const highlights = t.heroHighlights;
    if (!visible) return null;

    return (
        <div className="hidden lg:flex flex-col gap-3 mt-6">
            {highlights.map((h, i) => (
                <HighlightCard key={h.value} h={h} i={i} />
            ))}
        </div>
    );
}

function HighlightCard({ h, i }) {
    const ref = useRef(null);
    const handleMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
        el.style.setProperty("--glow-opacity", "1");
    }, []);
    const handleLeave = useCallback(() => {
        ref.current?.style.setProperty("--glow-opacity", "0");
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.06]"
        >
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: "var(--glow-opacity, 0)",
                    background:
                        "radial-gradient(120px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(51,194,204,0.15), transparent 70%)",
                }}
            />
            <div className="relative flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white">{h.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    {h.label}
                </span>
            </div>
        </motion.div>
    );
}

export default function HeroText({ skipAnimation = false }) {
    const { t } = useI18n();
    const workDuration = useWorkDuration();
    const { displayed, phase } = useTypewriter(t.hero.lines, 1000, skipAnimation);
    const isDone = phase === "done";

    return (
        <div className="z-10 mt-24 w-full md:mt-36 c-space flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Terminal */}
            <motion.div
                layoutId="main-terminal"
                initial={skipAnimation ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: skipAnimation ? 0 : 0.3,
                    layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                }}
                className="w-full max-w-2xl rounded-xl border border-white/10 bg-primary/70 backdrop-blur-md p-5 md:p-8 shadow-2xl shadow-lavender/5"
            >
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                        {t.hero.terminalTitle}
                    </span>
                </div>

                <div className="font-mono text-sm md:text-base space-y-1.5 min-h-[200px] md:min-h-[240px]">
                    {displayed.map((line, i) => (
                        <div key={i} className="leading-relaxed">
                            {line.isPrompt ? (
                                <span className="text-mint">{line.text}</span>
                            ) : (
                                <span className="text-neutral-300">{line.text}</span>
                            )}
                            {i === displayed.length - 1 && phase === "typing" && (
                                <span className="inline-block w-2.5 h-5 ml-0.5 bg-aqua/80 animate-pulse align-middle" />
                            )}
                        </div>
                    ))}

                    {isDone && (
                        <motion.div
                            initial={skipAnimation ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="leading-relaxed"
                        >
                            <span className="text-neutral-300">
                                {t.hero.uptimePrefix}{" "}
                                <span className="text-aqua tabular-nums font-bold">
                                    {workDuration}
                                </span>
                                {" "}{t.hero.uptimeSuffix}
                            </span>
                        </motion.div>
                    )}

                    {isDone && (
                        <motion.div
                            initial={skipAnimation ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: skipAnimation ? 0 : 0.5 }}
                            className="pt-3 leading-relaxed"
                        >
                            <span className="text-mint">$ </span>
                            <span className="inline-block w-2.5 h-5 bg-aqua/80 animate-pulse align-middle" />
                        </motion.div>
                    )}
                </div>
            </motion.div>

            <HeroHighlights visible={isDone} />

            {isDone && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: skipAnimation ? 0.2 : 0.8, duration: 0.6 }}
                    className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500 lg:hidden"
                >
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
                    {t.hero.statusWorking}{" "}
                    <span className="text-aqua tabular-nums">{workDuration}</span>
                    &rarr;{" "}
                    <a
                        href="#contact"
                        className="text-neutral-300 underline-offset-4 hover:text-white hover:underline"
                    >
                        {t.hero.statusCta}
                    </a>
                </motion.div>
            )}
        </div>
    );
}
