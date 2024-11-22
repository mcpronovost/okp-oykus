import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import path from "path";
// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: node({
        mode: "standalone"
    }),
    server: {
        port: 3000,
        host: true
    },
    env: {
      schema: {
        VITE_DOMAIN: envField.string({
          context: "server", // "server" or "client"
          access: "public", // "public" or "secret"
          optional: true
        }),
      }
    },
    compressHTML: true,
    integrations: [react()],
    vite: {
        build: {
            minify: "esbuild", // Use esbuild for minification
            target: "esnext" // Set the target for modern browsers
        },
    },
});
