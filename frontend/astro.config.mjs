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
  trailingSlash: "always",
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    port: 8080,
    host: true
  },
  vite: {
    server:{
      host: "0.0.0.0",
      hmr: {
        clientPort: 8080
      },
      port: 8080,
      watch: {
        usePolling: true
      }
    }
  }
});