import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";

export default function Hero({ skipTerminalAnimation = false }) {
    return (
        <section
            id="home"
            className="relative flex min-h-svh items-start justify-center overflow-hidden md:items-start md:justify-start c-space"
        >
            <HeroText skipAnimation={skipTerminalAnimation} />
            <ParallaxBackground />
        </section>
    );
}
