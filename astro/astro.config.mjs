import { defineConfig, passthroughImageService } from "astro/config";
import { fileURLToPath, URL } from "url";
import node from "@astrojs/node";
import vue from "@astrojs/vue";

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
  integrations: [vue({ jsx: true })],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler" // or "modern"
        }
      }
    },
    server: {
      watch: {
        usePolling: true,
      },
      fs: {
        allow: [".."],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
