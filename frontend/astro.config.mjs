import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import path from "path";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    server: {
        port: 3000,
        host: true,
    },
    env: {
        schema: {
            VITE_PROTOCOL: envField.string({
                context: "client", // "server" or "client"
                access: "public", // "public" or "secret"
            }),
            VITE_API: envField.string({
                context: "client",
                access: "public",
            }),
            VITE_API_VERSION: envField.string({
                context: "client",
                access: "public"
            }),
        },
    },
    compressHTML: true,
    integrations: [react()],
    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
        build: {
            minify: "esbuild", // Use esbuild for minification
            target: "esnext", // Set the target for modern browsers
        },
    },
});
