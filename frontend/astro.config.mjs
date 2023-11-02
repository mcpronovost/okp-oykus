import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  root: ".",
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  redirects: {},
  site: "https://oykus.okp.ca",
  compressHTML: true,
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    port: 3000,
    host: true
  },
  vite: {
    server:{
      host: "0.0.0.0",
      hmr: {
        clientPort: 3000
      },
      port: 3000,
      watch: {
        usePolling: true
      }
    }
  }
});