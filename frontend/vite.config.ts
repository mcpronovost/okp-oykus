import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: true,
        watch: {
            usePolling: true,
        },
    },
    plugins: [react()],
    build: {
        minify: "esbuild",
        target: "esnext",
    },
    resolve: {
        alias: {
            "@/assets": "/src/_assets",
            "@/services": "/src/_services",
            "@": "/src",
        },
    },
});
