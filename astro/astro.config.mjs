import { defineConfig, passthroughImageService } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svgHeaderPlugin from "./plugins/vite-plugin-svg-header";

const PUBLIC_PORT = parseInt(
  import.meta.env.PUBLIC_PORT || process.env.PUBLIC_PORT || 3000
);

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: PUBLIC_PORT,
    // host: "astro",
  },
  image: {
    service: passthroughImageService(),
  },
  compressHTML: true,
  integrations: [react(), tailwind()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler" // or "modern"
        }
      }
    },
    // Adds a plugin to prevent Safari from caching SVG's
    // This is a workaround for a Safari bug where svg's were not being retrieved properly and would occasionaly not display.
    plugins: [svgHeaderPlugin()],
    server: {
      fs: {
        // if you use this with --host anyone on the network can view
        // the contents of your yarn cache (including private packages)
        strict: false,
      },
      watch: {
        usePolling: true,
      },
      build: {
        // Instruct Vite to include .xlsx files as assets
        assetsInclude: ["**/*.xlsx"],
      },
    },
  },
});
