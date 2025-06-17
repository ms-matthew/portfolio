import { div } from "motion/react-client";
import React from "react";

const ParallaxBackground = () => {
    return (
        <section className="absolute inset-0 bg-black/40">
            <div className="relative h-screen overflow-y-hidden">
                {/* Background Sky */}
                <div className="absolute inset-0 w-full h-screen -z-50"
                     style={{
                        backgroundImage: "url(./assets/sky.jpg)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover"
                     }}
                />
                {/* Mountain Layer 3 */}
                <div/>
                {/* Planets */}
                <div/>
                {/* Mountain Layer 2 */}
                <div/>
                {/* Mountain Layer 1 */}
                <div/>
            </div>
        </section>
    )
}

export default ParallaxBackground