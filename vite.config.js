import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Repo path on GitHub Pages: https://yapweijun1996.github.io/Design-Prompt-Studio/
// When a custom domain is set, change `base` to "/".
const BASE = "/Design-Prompt-Studio/";

export default defineConfig({
  base: BASE,
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
    cssCodeSplit: true,
    // Chunk the 100 style preset files + prompt-generator out of the main bundle.
    // Both are pure data modules — splitting them lets the browser cache them
    // independently of app-shell changes and parallelises download.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/data/styles/")) return "styles";
          if (id.includes("/src/data/prompts/")) return "prompts";
        },
      },
    },
    // Raise warning threshold; the styles chunk is intentionally large (100 presets).
    chunkSizeWarningLimit: 700,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "icons/icon.svg",
        "icons/icon-maskable.svg",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/icon-maskable-192.png",
        "icons/icon-maskable-512.png",
        "icons/apple-touch-icon.png",
        "icons/favicon.png",
        "offline.html",
        "robots.txt",
        "sitemap.xml",
      ],
      manifest: {
        id: BASE,
        name: "Design Prompt Studio",
        short_name: "DPS",
        description:
          "Copy-paste prompts to design any webpage with any LLM. Pick a style, hit Copy, paste into Claude or ChatGPT.",
        start_url: ".",
        scope: ".",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        background_color: "#FFFFFF",
        theme_color: "#000000",
        orientation: "any",
        lang: "en",
        dir: "ltr",
        categories: ["productivity", "design", "developer", "utilities"],
        icons: [
          // PNG variants — preferred by Lighthouse / Android Chrome install banner
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          // SVG fallback — for browsers that prefer vector
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "icons/icon-maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Gallery",
            short_name: "Gallery",
            description: "Browse 100+ ready prompts",
            url: "./#gallery",
          },
          {
            name: "Studio",
            short_name: "Studio",
            description: "Build a custom prompt",
            url: "./#studio",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: "offline.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/_/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Prompt catalog JSON (added in P1)
            urlPattern: /\/data\/prompts\/.*\.json$/,
            handler: "CacheFirst",
            options: {
              cacheName: "prompts-catalog",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: "module",
      },
    }),
  ],
});
