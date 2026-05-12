import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

const accentColors = ["bg-mint", "bg-aqua", "bg-lavender", "bg-sand", "bg-coral"];
const sides = ["left", "right", "left", "right", "left"];

export default function Journey() {
    const { t } = useI18n();

    return (
        <section
            id="journey"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.journey.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.journey.section}
                </span>
            </div>

            <div className="journey-stage relative mt-12">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-1/2 md:-translate-x-px" />

                <ol className="space-y-12 md:space-y-16">
                    {t.journey.milestones.map((m, i) => (
                        <motion.li
                            key={m.date}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: i * 0.08 }}
                            className="relative grid grid-cols-[32px_1fr] gap-4 md:grid-cols-2 md:gap-12"
                        >
                            <div className="flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1">
                                <span
                                    className={cn(
                                        "mt-1 h-3 w-3 rounded-full ring-4 ring-primary",
                                        accentColors[i] || "bg-white",
                                    )}
                                />
                            </div>

                            <div
                                className={cn(
                                    "md:col-span-1",
                                    sides[i] === "right"
                                        ? "md:col-start-2 md:pl-8"
                                        : "md:col-start-1 md:text-right md:pr-8",
                                )}
                            >
                                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                    {m.date}
                                </span>
                                <h3 className="mt-1 text-xl font-bold text-neutral-200 md:text-2xl">
                                    {m.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-neutral-400">
                                    {m.body}
                                </p>
                            </div>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
