import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:8000/",
  appType: "spa",
  assetsDir: "assets",
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  optimizeDeps: {
    include: ["jquery"],
  },
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: "../static/app",
    assetsDir: "static",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          framework: ["react", "react-dom"],
          jquery: ["jquery"],
          fontawesome: [
            "@fortawesome/react-fontawesome",
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
          ],
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = "fonts";
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
      },
    },
  },
  plugins: [react()],
})
