import { motion } from "motion/react";
import { stack, levelColor } from "../data/skills";
import { useIsMobile } from "../hooks/useMediaQuery";
import { cn } from "../lib/cn";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

export default function Stack() {
    const isMobile = useIsMobile();
    const { t } = useI18n();

    return (
        <section
            id="stack"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.stack.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.stack.section}
                </span>
            </div>

            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md"
                >
                    <p className="text-2xl leading-snug text-neutral-200 md:text-3xl">
                        {t.stack.statement}
                    </p>
                    <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
                        {t.stack.bio}
                    </p>

                    <Legend />
                </motion.div>

                {isMobile ? (
                    <MobileStack />
                ) : (
                    <OrbitStage />
                )}
            </div>
        </section>
    );
}

function Legend() {
    const { t } = useI18n();
    const items = [
        { label: t.stack.legendExpert, level: "expert" },
        { label: t.stack.legendExperienced, level: "experienced" },
        { label: t.stack.legendComfortable, level: "comfortable" },
        { label: t.stack.legendLearning, level: "learning" },
    ];
    return (
        <ul className="mt-8 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            {items.map((it) => (
                <li
                    key={it.label}
                    className={cn(
                        "rounded-full border px-2.5 py-1",
                        levelColor[it.level],
                    )}
                >
                    {it.label}
                </li>
            ))}
        </ul>
    );
}

function OrbitStage() {
    const { t } = useI18n();
    const innerRadius = 110;
    const outerRadius = 200;
    const innerDur = 26;
    const outerDur = 60;

    return (
        <div
            className="orbit-stage relative mx-auto h-[460px] w-[460px] sm:h-[480px] sm:w-[480px]"
            aria-label="Stack visualization"
        >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender/10 blur-3xl" />

            <RingGuide radius={innerRadius} />
            <RingGuide radius={outerRadius} />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-primary/80 backdrop-blur">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                        {t.stack.centerLabel}
                    </span>
                    <span className="absolute inset-0 animate-pulse rounded-full border border-lavender/40" />
                </div>
            </div>

            {stack.core.map((skill, i) => (
                <Orbiter
                    key={skill.name}
                    skill={skill}
                    angle={(360 / stack.core.length) * i}
                    radius={innerRadius}
                    duration={innerDur}
                    size="lg"
                />
            ))}

            {stack.orbit.map((skill, i) => (
                <Orbiter
                    key={skill.name}
                    skill={skill}
                    angle={(360 / stack.orbit.length) * i}
                    radius={outerRadius}
                    duration={outerDur}
                    size="md"
                    reverse
                />
            ))}
        </div>
    );
}

function RingGuide({ radius }) {
    return (
        <div
            className="pointer-events-none absolute rounded-full border border-white/[0.04]"
            style={{
                width: radius * 2,
                height: radius * 2,
                left: `calc(50% - ${radius}px)`,
                top: `calc(50% - ${radius}px)`,
            }}
            aria-hidden
        />
    );
}

function Orbiter({ skill, angle, radius, duration, size, reverse }) {
    return (
        <div
            className="absolute left-1/2 top-1/2"
            style={{
                "--angle": angle,
                "--radius": radius,
                animation: `orbit ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
            }}
        >
            <div className="-translate-x-1/2 -translate-y-1/2">
                <Planet skill={skill} size={size} />
            </div>
        </div>
    );
}

function Planet({ skill, size }) {
    return (
        <div
            className={cn(
                "rounded-full border backdrop-blur transition-transform hover:scale-110",
                "shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
                levelColor[skill.level],
                size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-[12px]",
            )}
            title={`${skill.name} · ${skill.level} · ${skill.years}y`}
        >
            {skill.name}
        </div>
    );
}

function MobileStack() {
    const { t } = useI18n();
    return (
        <div className="space-y-6">
            <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {t.stack.coreLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {stack.core.map((s) => (
                        <li
                            key={s.name}
                            className={cn(
                                "rounded-full border px-3 py-1.5 text-sm",
                                levelColor[s.level],
                            )}
                        >
                            {s.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {t.stack.orbitLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {stack.orbit.map((s) => (
                        <li
                            key={s.name}
                            className={cn(
                                "rounded-full border px-2.5 py-1 text-[12px]",
                                levelColor[s.level],
                            )}
                        >
                            {s.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
