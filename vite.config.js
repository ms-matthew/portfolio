import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: "/portfolio/",
    plugins: [react(), tailwindcss()],
    build: {
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    three: ["three"],
                    r3f: ["@react-three/fiber", "@react-three/drei", "maath"],
                    motion: ["motion"],
                },
            },
        },
    },
});
