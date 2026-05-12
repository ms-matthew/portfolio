import { motion } from "motion/react";
import { projects } from "../data/projects";
import { cn } from "../lib/cn";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

export default function Projects() {
    const { t } = useI18n();

    return (
        <section
            id="work"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.projects.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.projects.section}
                </span>
            </div>

            <ol className="mt-10 divide-y divide-white/5">
                {projects.map((p, i) => (
                    <ProjectRow key={p.id} project={p} index={i} />
                ))}
            </ol>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                {t.projects.moreIn}{" "}
                <a href="#contact" className="text-aqua hover:underline">
                    {t.projects.directMessage}
                </a>
                .
            </p>
        </section>
    );
}

function ProjectRow({ project, index }) {
    const interactive = Boolean(project.href);
    return (
        <motion.li
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25) }}
            className="group relative"
        >
            <a
                href={project.href ?? undefined}
                aria-disabled={!interactive}
                onClick={(e) => !interactive && e.preventDefault()}
                className="relative block overflow-hidden px-2 py-8 transition"
            >
                <div
                    className={cn(
                        "pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        "bg-gradient-to-r",
                        project.accent,
                    )}
                />
                <div className="relative z-10 grid grid-cols-1 items-start gap-6 md:grid-cols-[70px_1fr_auto] md:gap-10">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                        {String(index + 1).padStart(2, "0")}
                        <br />
                        <span className="text-neutral-600">{project.year}</span>
                    </span>

                    <div>
                        <h3 className="text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-white md:text-4xl">
                            {project.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">
                            {project.blurb}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                            <span className="text-neutral-500">{project.role}</span>
                            <span className="text-neutral-700">/</span>
                            {project.stack.map((s, i) => (
                                <span key={s} className="text-neutral-400">
                                    {s}
                                    {i < project.stack.length - 1 && (
                                        <span className="ml-2 text-neutral-700">&middot;</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                        <span
                            className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                project.status === "shipped" && "bg-mint",
                                project.status === "ongoing" && "bg-aqua",
                                project.status === "live on this page" && "bg-lavender",
                                project.status === "private beta" && "bg-sand",
                            )}
                        />
                        <span className="text-neutral-400">{project.status}</span>
                    </div>
                </div>
            </a>
        </motion.li>
    );
}
