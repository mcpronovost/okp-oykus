import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default ({ mode }) => {
  loadEnv(mode, "../", "", true);
  return defineConfig({
    plugins: [react()],
    base: "/",
    server: {
      host: "localhost",
      port: 5173,
      origin: "http://localhost:5173",
    },
    build: {
      assetsDir: "",
      rollupOptions: {
        output: {
          entryFileNames: "static/js/[name]-[hash].js",
          chunkFileNames: "static/js/[name]-[hash].js",
          assetFileNames: ({ names }) => {
            if (/\.(ttf|woff|woff2|eot)$/.test(names?.[0] ?? "")) {
              return "static/fonts/[name][extname]";
            }
            return "static/[ext]/[name]-[hash].[ext]";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/assets": "/src/assets",
        "@/configs": "/src/configs",
        "@/i18n": "/src/services/i18n",
        "@/router": "/src/services/router",
        "@/types": "/src/types",
        "@": "/src",
      },
    },
  });
};
