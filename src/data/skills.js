/**
 * Add a skill: drop it into either `core` (inner ring, larger badge)
 * or `orbit` (outer ring). Keep `core` to ~4 — the inner ring gets crowded fast.
 *
 *   { name, years, level }
 *     level: "expert" | "experienced" | "comfortable" | "learning"
 */
export const stack = {
    core: [
        { name: "React", years: 2, level: "expert" },
        { name: "JavaScript", years: 3, level: "expert" },
        { name: "TypeScript", years: 2, level: "experienced" },
        { name: "Vite", years: 2, level: "expert" },
    ],
    orbit: [
        { name: "WebRTC", years: 1, level: "experienced" },
        { name: "SignalR", years: 1, level: "experienced" },
        { name: "Tailwind", years: 2, level: "experienced" },
        { name: "three.js", years: 1, level: "comfortable" },
        { name: "Go", years: 0.5, level: "learning" },
        { name: "Jetpack Compose", years: 0.5, level: "learning" },
        { name: "Node", years: 2, level: "comfortable" },
        { name: "motion", years: 1, level: "comfortable" },
    ],
};

export const levelColor = {
    expert: "text-white border-white/30 bg-white/[0.06]",
    experienced: "text-aqua border-aqua/40 bg-aqua/[0.06]",
    comfortable: "text-lavender border-lavender/40 bg-lavender/[0.06]",
    learning: "text-sand border-sand/50 bg-sand/[0.06]",
};
