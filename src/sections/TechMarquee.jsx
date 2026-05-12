const items = [
    "React",
    "JavaScript",
    "TypeScript",
    "Vite",
    "WebRTC",
    "SignalR",
    "Tailwind",
    "three.js",
    "Go",
    "Jetpack Compose",
    "Node",
    "motion",
];

function Row({ "aria-hidden": ariaHidden }) {
    return (
        <ul className="flex flex-shrink-0 items-center" aria-hidden={ariaHidden}>
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-center gap-10 pr-10 font-mono text-lg uppercase tracking-[0.18em] text-neutral-400"
                >
                    {item}
                    <span className="text-lavender/60">&diams;</span>
                </li>
            ))}
        </ul>
    );
}

export default function TechMarquee() {
    return (
        <section
            aria-label="What I work with"
            className="relative overflow-hidden border-y border-white/5 py-5"
        >
            {/* gradient fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-primary to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-primary to-transparent" />

            <div
                className="flex w-max will-change-transform"
                style={{ animation: "marquee 60s linear infinite" }}
            >
                <Row />
                <Row aria-hidden />
            </div>
        </section>
    );
}
