import { useRef, useCallback } from "react";
import { cn } from "../lib/cn";

/**
 * A card wrapper that shows a radial glow following the mouse cursor.
 * Pure CSS + JS, no extra deps.
 */
export default function GlowCard({ children, className, ...props }) {
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
            className={cn("glow-card", className)}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            {...props}
        >
            {children}
        </div>
    );
}
