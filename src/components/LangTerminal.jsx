import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useI18n } from "../i18n";

/**
 * Full-screen CLI terminal:
 *  1) Types `npx create-portfolio` — user picks language
 *  2) "Installs" deps with animated lines
 *  3) Continues into hero terminal content (whoami, skills, uptime)
 *  4) Shrinks + flies into hero position, overlay fades → portfolio revealed
 */

const WORK_START = new Date("2025-08-21T00:00:00");

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
    if (months < 0) { years--; months += 12; }
    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    parts.push(`${days}d`);
    return parts.join(" ");
}

const INSTALL_LINES = [
    { text: "Scaffolding project in ./portfolio...", delay: 180 },
    { text: "Installing dependencies...", delay: 500 },
    { text: "  react 19.1.0", tag: "ok", delay: 220 },
    { text: "  three 0.177.0", tag: "ok", delay: 160 },
    { text: "  motion 12.18.1", tag: "ok", delay: 140 },
    { text: "  vite 6.3.5", tag: "ok", delay: 120 },
    { text: "", delay: 80 },
    { text: "Done. Now run:", delay: 180 },
    { text: "", delay: 40 },
    { text: "  cd portfolio", tag: "dim", delay: 120 },
    { text: "  npm run dev", tag: "dim", delay: 120 },
    { text: "", delay: 80 },
    { text: "  VITE v6.3.5  ready in 420ms", tag: "vite", delay: 350 },
    { text: "", delay: 40 },
    { text: "  Local:   https://mateusz.dev/", tag: "link", delay: 180 },
];

const OPTIONS = [
    { value: "pl", label: "Polski", flag: "\uD83C\uDDF5\uD83C\uDDF1" },
    { value: "en", label: "English", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
];

// Hero lines per language (typed after install)
function getHeroLines(t) {
    return [
        ...t.hero.lines,
        // uptime output added as a plain output line
        { output: `up ${calcDuration()} ${t.hero.uptimeSuffix}`, delay: 30 },
    ];
}

export default function LangTerminal({ onDone }) {
    const { setLang, t } = useI18n();
    const [phase, setPhase] = useState("boot");
    // boot → select → install → hero → exit
    const [selected, setSelected] = useState(0);
    const [installLines, setInstallLines] = useState([]);
    const [bootText, setBootText] = useState("");
    // Hero typing state
    const [heroLines, setHeroLines] = useState([]);
    const [heroCursor, setHeroCursor] = useState(true);
    const containerRef = useRef(null);
    const heroTimerRef = useRef(null);
    const chosenLangRef = useRef(null);

    const scroll = () => {
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    };

    // Boot typewriter
    useEffect(() => {
        if (phase !== "boot") return;
        const cmd = "npx create-portfolio@latest";
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setBootText(cmd.slice(0, i));
            if (i >= cmd.length) {
                clearInterval(interval);
                setTimeout(() => setPhase("select"), 400);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [phase]);

    // Keyboard for select
    useEffect(() => {
        if (phase !== "select") return;
        const handler = (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                setSelected((s) => (s - 1 + OPTIONS.length) % OPTIONS.length);
            } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                setSelected((s) => (s + 1) % OPTIONS.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                doConfirm();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [phase, selected]);

    // Start hero typing after install
    const startHeroPhase = useCallback(() => {
        setPhase("hero");
        // We need to use the translations for the chosen language
        // chosenLangRef has the lang value, but we already called setLang so t is updated
    }, []);

    // Hero typing engine
    useEffect(() => {
        if (phase !== "hero") return;
        const lines = getHeroLines(t);
        let lineIdx = 0;
        let charIdx = 0;

        function tick() {
            if (lineIdx >= lines.length) {
                // All hero lines typed — start exit
                setHeroCursor(true);
                setTimeout(() => {
                    setPhase("exit");
                    setTimeout(onDone, 800);
                }, 600);
                return;
            }

            const line = lines[lineIdx];
            const text = line.prompt || line.output || "";
            const speed = line.prompt ? 40 : (line.delay || 25);

            if (charIdx === 0) {
                // Add new line entry
                setHeroLines((prev) => [
                    ...prev,
                    { text: "", isPrompt: Boolean(line.prompt) },
                ]);
            }

            if (charIdx < text.length) {
                charIdx++;
                setHeroLines((prev) => {
                    const copy = [...prev];
                    copy[copy.length - 1] = {
                        ...copy[copy.length - 1],
                        text: text.slice(0, charIdx),
                    };
                    return copy;
                });
                scroll();
                heroTimerRef.current = setTimeout(tick, speed);
            } else {
                // Line done, pause then next
                lineIdx++;
                charIdx = 0;
                heroTimerRef.current = setTimeout(tick, line.prompt ? 250 : 400);
            }
        }

        // Small gap after install before hero starts
        heroTimerRef.current = setTimeout(tick, 500);
        return () => clearTimeout(heroTimerRef.current);
    }, [phase, t, onDone]);

    const doConfirm = useCallback(() => {
        if (phase !== "select") return;
        const choice = OPTIONS[selected].value;
        chosenLangRef.current = choice;
        setLang(choice);
        setPhase("install");

        let total = 0;
        INSTALL_LINES.forEach((line) => {
            total += line.delay;
            setTimeout(() => {
                setInstallLines((p) => [...p, line]);
                scroll();
            }, total);
        });

        setTimeout(() => {
            startHeroPhase();
        }, total + 400);
    }, [phase, selected, setLang, startHeroPhase]);

    const isExiting = phase === "exit";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isExiting ? 0.7 : 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 grid place-items-center"
            style={{ background: isExiting ? "transparent" : "#09090f" }}
        >
            {/* Grid bg */}
            {!isExiting && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
            )}

            <motion.div
                layout
                layoutId="main-terminal"
                className="relative w-full max-w-xl 2xl:max-w-2xl mx-4"
                transition={{
                    layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                }}
            >
                <motion.div
                    layout
                    className="rounded-xl border border-white/10 bg-[#0e0e16] shadow-2xl shadow-black/60 overflow-hidden"
                >
                    {/* Title bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-auto font-mono text-[10px] text-neutral-600 tracking-wider">
                            ~/portfolio
                        </span>
                    </div>

                    {/* Body */}
                    <div
                        ref={containerRef}
                        className="p-5 md:p-6 font-mono text-[13px] md:text-sm leading-[1.7] max-h-[70vh] overflow-y-auto"
                    >
                        {/* Boot command */}
                        <Ln>
                            <span className="text-mint select-none">{">"}</span>
                            <span className="text-neutral-300 ml-2">{bootText}</span>
                            {phase === "boot" && <Cursor />}
                        </Ln>

                        {/* Language selection */}
                        <AnimatePresence>
                            {phase !== "boot" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="mt-3"
                                >
                                    <Ln>
                                        <Bar /><span className="text-white font-semibold ml-2">create-portfolio</span>
                                        <span className="text-neutral-600 ml-2">v1.0.0</span>
                                    </Ln>
                                    <Ln><Bar /></Ln>
                                    <Ln>
                                        <span className="text-lavender select-none">{phase === "select" ? "\u25C7" : "\u25C6"}</span>
                                        <span className="text-neutral-200 ml-2">
                                            {phase === "select"
                                                ? "Select language / Wybierz jezyk"
                                                : `Language: ${OPTIONS[selected].flag} ${OPTIONS[selected].label}`}
                                        </span>
                                    </Ln>

                                    {phase === "select" && (
                                        <>
                                            {OPTIONS.map((opt, i) => {
                                                const active = i === selected;
                                                return (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => {
                                                            if (active) {
                                                                doConfirm();
                                                            } else {
                                                                setSelected(i);
                                                            }
                                                        }}
                                                        className={`flex items-center w-full text-left py-2 sm:py-0.5 pl-5 transition-colors cursor-pointer ${
                                                            active ? "text-aqua" : "text-neutral-500 hover:text-neutral-300 active:text-neutral-200"
                                                        }`}
                                                    >
                                                        <Bar className="mr-3" />
                                                        <span className="w-4 text-center select-none">{active ? "\u25CF" : "\u25CB"}</span>
                                                        <span className="ml-2">{opt.flag}</span>
                                                        <span className="ml-2">{opt.label}</span>
                                                        {active && <span className="ml-auto mr-2 text-[10px] text-aqua/60 hidden sm:inline">&crarr;</span>}
                                                    </button>
                                                );
                                            })}
                                            {/* Desktop hint */}
                                            <Ln className="text-neutral-600 text-[11px] pl-5 hidden sm:flex">
                                                <Bar className="mr-3" />
                                                <Kbd>↑↓</Kbd>
                                                <span className="mx-1.5">navigate</span>
                                                <span className="text-neutral-700 mx-1">/</span>
                                                <Kbd>enter</Kbd>
                                                <span className="ml-1.5">confirm</span>
                                            </Ln>
                                            {/* Mobile hint */}
                                            <Ln className="text-neutral-600 text-[11px] pl-5 flex sm:hidden">
                                                <Bar className="mr-3" />
                                                <span>tap to select</span>
                                            </Ln>
                                        </>
                                    )}

                                    <Ln><Bar /></Ln>
                                    {phase !== "select" && (
                                        <Ln><span className="text-lavender select-none">{"\u2514"}</span></Ln>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Install output */}
                        {installLines.length > 0 && <div className="mt-2" />}
                        {installLines.map((line, i) => (
                            <motion.div
                                key={`inst-${i}`}
                                initial={{ opacity: 0, x: -3 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.12 }}
                            >
                                <Ln className={tagClass(line.tag)}>
                                    {line.tag === "ok" && <span className="text-mint select-none mr-1">{"\u2713"}</span>}
                                    {line.tag === "link" && <span className="text-aqua select-none mr-1">{"\u279C"}</span>}
                                    {line.text === "" ? "\u00A0" : line.text}
                                </Ln>
                            </motion.div>
                        ))}

                        {/* Divider before hero lines */}
                        {heroLines.length > 0 && (
                            <div className="my-3 border-t border-white/[0.06]" />
                        )}

                        {/* Hero terminal lines — whoami, skills, focus, uptime */}
                        {heroLines.map((line, i) => (
                            <div key={`hero-${i}`} className="leading-relaxed">
                                {line.isPrompt ? (
                                    <span className="text-mint">{line.text}</span>
                                ) : (
                                    <span className="text-neutral-300">{line.text}</span>
                                )}
                                {/* Cursor on the last line while typing */}
                                {i === heroLines.length - 1 && phase === "hero" && <Cursor />}
                            </div>
                        ))}

                        {/* Final blinking prompt */}
                        {(phase === "exit") && (
                            <div className="pt-2 leading-relaxed">
                                <span className="text-mint">$ </span>
                                <Cursor />
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function Ln({ children, className = "" }) {
    return <div className={`flex items-center min-h-[1.7em] ${className}`}>{children}</div>;
}

function Bar({ className = "" }) {
    return <span className={`text-lavender select-none ${className}`}>{"\u2502"}</span>;
}

function Cursor() {
    return <span className="inline-block w-2 h-[1.1em] ml-1 bg-aqua/80 animate-pulse align-middle" />;
}

function Kbd({ children }) {
    return (
        <span className="inline-flex items-center justify-center rounded border border-neutral-700 bg-neutral-800/50 px-1 py-px text-[10px] text-neutral-500 leading-none">
            {children}
        </span>
    );
}

function tagClass(tag) {
    switch (tag) {
        case "ok": return "text-neutral-300";
        case "vite": return "text-lavender font-semibold";
        case "link": return "text-aqua";
        case "dim": return "text-neutral-500";
        default: return "text-neutral-400";
    }
}
