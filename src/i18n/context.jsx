import { createContext, useCallback, useContext, useState } from "react";
import { translations } from "./translations";

const I18nContext = createContext(null);

function getInitialLang() {
    if (typeof window === "undefined") return "pl";
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "pl") return stored;
    return null; // Not chosen yet
}

export function I18nProvider({ children }) {
    const initial = getInitialLang();
    const [lang, setLangState] = useState(initial ?? "pl");
    const [chosen, setChosen] = useState(initial !== null);

    const setLang = useCallback((l) => {
        setLangState(l);
        setChosen(true);
        localStorage.setItem("lang", l);
    }, []);

    const toggle = useCallback(() => {
        setLangState((prev) => {
            const next = prev === "en" ? "pl" : "en";
            localStorage.setItem("lang", next);
            return next;
        });
        setChosen(true);
    }, []);

    const t = translations[lang];

    return (
        <I18nContext.Provider value={{ lang, setLang, toggle, t, langChosen: chosen }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used within I18nProvider");
    return ctx;
}
