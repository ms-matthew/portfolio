import { useCallback, useEffect, useRef, useState } from "react";
import { STORAGE_KEYS, SYNC, UNLOCK } from "../constants";

function readBounds() {
    return {
        x: window.screenX,
        y: window.screenY,
        w: window.innerWidth,
        h: window.innerHeight,
        ts: Date.now(),
    };
}

function centerDistance(a, b) {
    if (!a || !b) return Infinity;
    const dx = a.x + a.w / 2 - (b.x + b.w / 2);
    const dy = a.y + a.h / 2 - (b.y + b.h / 2);
    return Math.hypot(dx, dy);
}

function distanceToProgress(distance) {
    if (!isFinite(distance)) return 0;
    if (distance <= UNLOCK.radius) return 1;
    if (distance >= UNLOCK.approach) return 0;
    return (UNLOCK.approach - distance) / (UNLOCK.approach - UNLOCK.radius);
}

/**
 * Bidirectional window-position sync via localStorage.
 * Role "main" runs in the portfolio window; "key" runs in the child window.
 * Returns a latched `unlocked` flag that never regresses to false unless
 * `relock()` is called explicitly.
 */
export function useWindowSync(role) {
    const [myBounds, setMyBounds] = useState(readBounds);
    const [otherBounds, setOtherBounds] = useState(null);
    const [unlocked, setUnlocked] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem(STORAGE_KEYS.unlocked) === "true";
    });
    const unlockedRef = useRef(unlocked);

    const myKey = role === "main" ? STORAGE_KEYS.main : STORAGE_KEYS.child;
    const otherKey = role === "main" ? STORAGE_KEYS.child : STORAGE_KEYS.main;

    useEffect(() => {
        const publish = () => {
            const b = readBounds();
            setMyBounds(b);
            localStorage.setItem(myKey, JSON.stringify(b));
        };

        publish();
        const id = setInterval(publish, SYNC.pollMs);

        const onUnload = () => localStorage.removeItem(myKey);
        window.addEventListener("beforeunload", onUnload);

        return () => {
            clearInterval(id);
            window.removeEventListener("beforeunload", onUnload);
            localStorage.removeItem(myKey);
        };
    }, [myKey]);

    useEffect(() => {
        const readOther = () => {
            const raw = localStorage.getItem(otherKey);
            if (!raw) return setOtherBounds(null);
            try {
                const parsed = JSON.parse(raw);
                if (Date.now() - parsed.ts > SYNC.staleMs) {
                    setOtherBounds(null);
                } else {
                    setOtherBounds(parsed);
                }
            } catch {
                setOtherBounds(null);
            }
        };

        readOther();
        const id = setInterval(readOther, SYNC.pollMs);

        const onStorage = (e) => {
            if (e.key === otherKey) readOther();
            if (e.key === STORAGE_KEYS.unlocked) {
                const next = e.newValue === "true";
                unlockedRef.current = next;
                setUnlocked(next);
            }
        };
        window.addEventListener("storage", onStorage);

        return () => {
            clearInterval(id);
            window.removeEventListener("storage", onStorage);
        };
    }, [otherKey]);

    useEffect(() => {
        if (unlockedRef.current) return;
        const d = centerDistance(myBounds, otherBounds);
        if (!isFinite(d) || d > UNLOCK.radius) return;

        unlockedRef.current = true;
        setUnlocked(true);
        localStorage.setItem(STORAGE_KEYS.unlocked, "true");
    }, [myBounds, otherBounds]);

    const relock = useCallback(() => {
        unlockedRef.current = false;
        setUnlocked(false);
        localStorage.setItem(STORAGE_KEYS.unlocked, "false");
    }, []);

    const unlock = useCallback(() => {
        unlockedRef.current = true;
        setUnlocked(true);
        localStorage.setItem(STORAGE_KEYS.unlocked, "true");
    }, []);

    const distance = centerDistance(myBounds, otherBounds);

    return {
        myBounds,
        otherBounds,
        unlocked,
        hasPartner: !!otherBounds,
        distance,
        progress: distanceToProgress(distance),
        relock,
        unlock,
    };
}
