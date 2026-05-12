import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "../i18n";

function Navigation({ onNavigate }) {
    const { t } = useI18n();
    const links = [
        { href: "#home", label: t.nav.home },
        { href: "#about", label: t.nav.about },
        { href: "#stack", label: t.nav.stack },
        { href: "#now", label: t.nav.now },
        { href: "#work", label: t.nav.work },
        { href: "#journey", label: t.nav.journey },
        { href: "#contact", label: t.nav.contact },
    ];

    return (
        <ul className="nav-ul">
            {links.map((l) => (
                <li className="nav-li" key={l.href}>
                    <a className="nav-link" href={l.href} onClick={onNavigate}>
                        {l.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, toggle } = useI18n();
    const close = () => setIsOpen(false);

    return (
        <div className="fixed inset-x-0 z-20 w-full bg-primary/40 backdrop-blur-lg">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex items-center justify-between py-2 xm:py-0">
                    <a
                        href="#home"
                        className="text-xl font-bold text-neutral-300 transition-colors hover:text-white"
                    >
                        Mateusz
                    </a>

                    <div className="flex items-center gap-1">
                        <nav className="hidden sm:flex">
                            <Navigation onNavigate={close} />
                        </nav>
                        {/* Tiny lang button — unobtrusive, just the code */}
                        <button
                            onClick={toggle}
                            className="ml-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors cursor-pointer"
                            title={lang === "pl" ? "Switch to English" : "Zmien na polski"}
                        >
                            {lang === "pl" ? "EN" : "PL"}
                        </button>
                        <motion.button
                            onClick={() => setIsOpen((v) => !v)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden ml-2"
                            initial={false}
                            animate={{ scale: 1 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isOpen ? "close" : "open"}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/${isOpen ? "close" : "open"}.svg`}
                                        className="h-6 w-6"
                                        alt=""
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-nav"
                        className="block overflow-hidden text-center sm:hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="pb-5">
                            <Navigation onNavigate={close} />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
