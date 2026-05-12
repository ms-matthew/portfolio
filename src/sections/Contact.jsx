import { motion } from "motion/react";
import { useI18n } from "../i18n";
import SplitText from "../components/SplitText";

const channels = [
    {
        key: "email",
        label: "email",
        handle: "mateusz.stachowicz1@wp.pl",
        href: "mailto:mateusz.stachowicz1@wp.pl",
    },
    {
        key: "github",
        label: "github",
        handle: "/ms-matthew",
        href: "#",
    },
    {
        key: "linkedin",
        label: "linkedin",
        handle: "/in/ms-matthew",
        href: "#",
    },
];

export default function Contact() {
    const { t } = useI18n();

    return (
        <section
            id="contact"
            className="c-space mx-auto mt-28 max-w-[90rem] md:mt-40"
        >
            <div className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4">
                <h2 className="text-heading">
                    <SplitText>{t.contact.heading}</SplitText>
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    &sect;{t.contact.section}
                </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                >
                    <p className="text-2xl leading-snug text-neutral-200 md:text-3xl">
                        {t.contact.statement}
                    </p>
                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400">
                        {t.contact.bio}
                    </p>
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="md:min-w-[320px]"
                >
                    {channels.map((c, i) => (
                        <li
                            key={c.key}
                            className={i === 0 ? "" : "border-t border-white/5"}
                        >
                            <a
                                href={c.href}
                                className="group flex items-center justify-between gap-6 py-4 transition-colors hover:text-white"
                            >
                                <div>
                                    <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500 group-hover:text-lavender">
                                        {c.label}
                                    </span>
                                    <span className="mt-1 block text-[15px] text-neutral-200">
                                        {c.handle}
                                    </span>
                                </div>
                                <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-600 sm:block">
                                    {t.contact.channelNotes[c.key]}
                                </span>
                            </a>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
