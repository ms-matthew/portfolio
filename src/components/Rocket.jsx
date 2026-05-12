/*
 * GLTF model: Rocket Ship Pixels crumble — jlehman2028 — CC-BY-4.0
 * https://sketchfab.com/3d-models/rocket-ship-pixels-crumble-c030f75d753940a88cef037d00954183
 *
 * This file used to host an entrance animation; positioning is now driven
 * externally by RocketCompanion, so this component is a pure renderer.
 */

import { useGLTF } from "@react-three/drei";

const MODEL_URL = `${import.meta.env.BASE_URL}models/rocket_ship_pixels_crumble.glb`;

export function RocketModel() {
    const { nodes, materials } = useGLTF(MODEL_URL);

    if (!nodes || !materials || !nodes.Object_9) return null;

    return (
        <group rotation={[-Math.PI / 2, Math.PI / 4, 0]}>
            <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials.Material_28} />
            <mesh castShadow receiveShadow geometry={nodes.Object_11.geometry} material={materials.Material_27} />
            <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials.Material_29} />
            <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials.Material_42} />
            <mesh castShadow receiveShadow geometry={nodes.Object_17.geometry} material={materials.Material_30} />
        </group>
    );
}

useGLTF.preload(MODEL_URL);
