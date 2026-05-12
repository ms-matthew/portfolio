import { motion } from "motion/react";

/**
 * Renders text as individually animated letters with stagger.
 * Wraps each word in a span to allow natural word-wrap.
 */
export default function SplitText({ children, className, delay = 0 }) {
    const text = typeof children === "string" ? children : "";
    const words = text.split(" ");

    let charIdx = 0;
    return (
        <span className={className} aria-label={text}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-block">
                    {word.split("").map((char) => {
                        const i = charIdx++;
                        return (
                            <motion.span
                                key={`${wi}-${i}`}
                                className="inline-block"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.4,
                                    delay: delay + i * 0.025,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                aria-hidden
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                    {wi < words.length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </span>
    );
}
