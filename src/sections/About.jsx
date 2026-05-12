import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

const WORK_START = new Date("2025-08-21T00:00:00");

function useWorkMonths() {
    const [months, setMonths] = useState(() => calcMonths());
    useEffect(() => {
        const id = setInterval(() => setMonths(calcMonths()), 60_000);
        return () => clearInterval(id);
    }, []);
    return months;
}

function calcMonths() {
    const now = new Date();
    return (
        (now.getFullYear() - WORK_START.getFullYear()) * 12 +
        (now.getMonth() - WORK_START.getMonth())
    );
}

function GlowWrap({ children, className, ...props }) {
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
        <div
            ref={ref}
            className={cn("relative overflow-hidden", className)}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            {...props}
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
                style={{
                    opacity: "var(--glow-opacity, 0)",
                    background:
                        "radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(122,87,219,0.08), transparent 70%)",
                }}
            />
            {children}
        </div>
    );
}

function parseStatement(text) {
    // Replace <aqua>...</aqua> and <lavender>...</lavender> with colored spans
    const parts = [];
    const regex = /<(aqua|lavender)>(.*?)<\/\1>/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ text: text.slice(lastIndex, match.index), color: null });
        }
        parts.push({ text: match[2], color: match[1] });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push({ text: text.slice(lastIndex), color: null });
    }
    return parts;
}

export default function About() {
    const { t } = useI18n();
    const workMonths = useWorkMonths();
    const statementParts = parseStatement(t.about.statement);

    return (
        <section
            id="about"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.about.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.about.section}
                </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[auto_auto] md:gap-5">
                <GlowWrap
                    className={cn(
                        "md:col-span-4 md:row-span-2",
                        "rounded-2xl p-8 md:p-10",
                        "bg-gradient-to-br from-indigo via-navy to-primary",
                        "border border-white/5",
                    )}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.65 }}
                    >
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lavender/20 blur-3xl" />
                        <p className="relative text-2xl leading-snug text-neutral-200 md:text-3xl">
                            {statementParts.map((p, i) =>
                                p.color ? (
                                    <em
                                        key={i}
                                        className={cn(
                                            "not-italic",
                                            p.color === "aqua" ? "text-aqua" : "text-lavender",
                                        )}
                                    >
                                        {p.text}
                                    </em>
                                ) : (
                                    <span key={i}>{p.text}</span>
                                ),
                            )}
                        </p>
                        <p className="relative mt-6 max-w-md text-[15px] leading-relaxed text-neutral-400">
                            {t.about.bio}
                        </p>
                    </motion.div>
                </GlowWrap>

                <GlowWrap className="rounded-2xl border border-white/5 bg-gradient-to-br from-storm to-indigo p-6 md:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                    >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                            {t.about.locationTitle}
                        </p>
                        <div className="mt-4 space-y-1 text-[15px] text-neutral-200">
                            <p>{t.about.location}</p>
                            <p className="text-neutral-500">{t.about.coords}</p>
                        </div>
                        <div className="mt-6 font-mono text-[11px] leading-relaxed text-neutral-400">
                            {t.about.replyWeekday}
                            <br />
                            {t.about.replyWeekend}
                        </div>
                    </motion.div>
                </GlowWrap>

                <GlowWrap className="rounded-2xl border border-white/5 bg-gradient-to-br from-royal to-lavender p-6 md:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                            {t.about.statsTitle}
                        </p>
                        <ul className="mt-4 grid grid-cols-2 gap-3 text-white">
                            <li>
                                <div className="text-3xl font-bold tabular-nums">
                                    {workMonths}+
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                                    {t.about.statMonths}
                                </div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold">React</div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                                    {t.about.statReact}
                                </div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold">WebRTC</div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                                    {t.about.statWebRTC}
                                </div>
                            </li>
                            <li>
                                <div className="text-3xl font-bold">Go</div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                                    {t.about.statGo}
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </GlowWrap>
            </div>
        </section>
    );
}
