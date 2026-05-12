import { motion } from "motion/react";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

export default function Now() {
    const { t } = useI18n();
    const stamp = new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
    });

    return (
        <section
            id="now"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.now.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.now.section} &middot; {stamp}
                </span>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                {t.now.items.map((item, i) => (
                    <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, delay: i * 0.07 }}
                        className="flex gap-5"
                    >
                        <span className="mt-[9px] h-px w-10 flex-shrink-0 bg-gradient-to-r from-lavender/80 to-transparent" />
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                {item.label}
                            </p>
                            <p className="mt-2 text-lg leading-relaxed text-neutral-200 md:text-xl">
                                {item.body}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
