import { useI18n } from "../i18n";

export default function Footer() {
    const { t } = useI18n();
    const year = new Date().getFullYear();
    return (
        <footer className="c-space mx-auto mt-28 max-w-[90rem] border-t border-white/5 py-10 md:mt-40">
            <div className="flex flex-col items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 sm:flex-row sm:items-center">
                <span>
                    &copy; {year} Mateusz &middot; {t.footer.built}
                </span>
                <span className="text-neutral-600">
                    {t.footer.tagline}
                </span>
            </div>
        </footer>
    );
}
