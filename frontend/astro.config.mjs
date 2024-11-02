import { defineConfig, passthroughImageService } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";

const PUBLIC_PORT = parseInt(process.env.PUBLIC_PORT || 3000);

export default defineConfig({
  output: "server",

  // Server configuration
  adapter: node({
    mode: "standalone"
  }),
  server: {
    port: PUBLIC_PORT
  },

  // Performance optimizations
  compressHTML: true,
  prefetch: true,
  build: {
    inlineStylesheets: "auto",
    minify: true
  },

  // Image handling
  image: {
    service: passthroughImageService()
  },

  // React integration
  integrations: [
    react({
      include: ["**/*.{jsx,tsx}"],
      strictMode: true,
    })
  ],

  // Development tools
  devToolbar: {
    enabled: false
  },

  // Vite configuration
  vite: {
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
          api: "modern-compiler"
        }
      }
    },
    server: {
      watch: {
        usePolling: true
      },
      fs: {
        allow: [".."]
      }
    },
    resolve: {
      alias: {
        "@": "/src"
      }
    },
  }
});