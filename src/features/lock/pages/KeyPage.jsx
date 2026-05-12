import { useEffect } from "react";
import KeyWindow from "../components/KeyWindow";

export default function KeyPage() {
    useEffect(() => {
        const prev = document.title;
        document.title = "Key · portfolio";
        return () => {
            document.title = prev;
        };
    }, []);

    return <KeyWindow />;
}
