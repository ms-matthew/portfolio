import {Canvas} from "@react-three/fiber"
import HeroText from "../components/HeroText"
import ParallaxBackground from "../components/ParallaxBackground"
import { Rocket } from "../components/Rocket"
import { OrbitControls } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"

const Hero = () => {
    const isMobile = useMediaQuery({maxWidth: 853})
    
    return (
        <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
            <HeroText/>
            <ParallaxBackground/>
            <figure className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.85} />
                    <Rocket
                        scale={isMobile ? 0.2 : 0.3}
                        position={isMobile ? [10, 0, 0] : [35, 0, 0]}
                        rotation={[-Math.PI / 4, 6, -0.01]}
                    />
                </Canvas>
            </figure>
        </section>
    )
}

export default Hero