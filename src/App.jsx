import { lazy, Suspense, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import TechMarquee from "./sections/TechMarquee";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Now from "./sections/Now";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Journey from "./sections/Journey";
import Footer from "./sections/Footer";
import ScrollProgress from "./components/ScrollProgress";
import LangTerminal from "./components/LangTerminal";
import { LockGate, KeyPage, KEY_WINDOW, useLock } from "./features/lock";
import { I18nProvider, useI18n } from "./i18n";

const RocketCompanion = lazy(() => import("./components/RocketCompanion.jsx"));

function useRouteMode() {
    return useMemo(() => {
        if (typeof window === "undefined") return null;
        return new URLSearchParams(window.location.search).get("mode");
    }, []);
}

function Portfolio() {
    const { unlocked } = useLock();
    const { langChosen } = useI18n();
    const [terminalDismissed, setTerminalDismissed] = useState(false);

    const showTerminal = unlocked && !langChosen && !terminalDismissed;
    // If user came through the terminal, skip the hero typewriter animation
    const cameFromTerminal = terminalDismissed;

    return (
        <LayoutGroup>
            <ScrollProgress />
            <Navbar />
            {unlocked && (
                <Suspense fallback={null}>
                    <RocketCompanion />
                </Suspense>
            )}
            <main className="w-full">
                <Hero skipTerminalAnimation={cameFromTerminal} />
                <TechMarquee />
                <About />
                <Stack />
                <Now />
                <Projects />
                <Journey />
                <Contact />
                <Footer />
            </main>

            <AnimatePresence>
                {showTerminal && (
                    <LangTerminal onDone={() => setTerminalDismissed(true)} />
                )}
            </AnimatePresence>
        </LayoutGroup>
    );
}

export default function App() {
    const mode = useRouteMode();
    if (mode === KEY_WINDOW.mode) return <KeyPage />;

    return (
        <I18nProvider>
            <LockGate>
                <Portfolio />
            </LockGate>
        </I18nProvider>
    );
}
