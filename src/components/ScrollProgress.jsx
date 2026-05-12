import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
            style={{
                scaleX,
                background:
                    "linear-gradient(90deg, #33c2cc 0%, #7a57db 50%, #ca2f8c 100%)",
            }}
        />
    );
}
