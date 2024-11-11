import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    cacheDir: "./.vite",
    define: {
      "process.env": env
    },
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        }
      }
    },
    server: {
      watch: {
        usePolling: true
      },
    },
    resolve: {
      alias: {
        "@": "/src"
      }
    },
  }
});
