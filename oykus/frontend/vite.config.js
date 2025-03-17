import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "http://localhost:8000",
  build: {
    outDir: "dist",
    assetsDir: "static",
  },
  plugins: [
    react(),
    {
      name: "static-asset-fixer",
      enforce: "post",
      apply: "serve",
      transform: (code, _) => {
        return {
          code: code.replace(
            /\/src\/(.*)\.(svg|jp?g|png|webp)/g,
            "http://localhost:5173/src/$1.$2"
          ),
          map: null,
        };
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
