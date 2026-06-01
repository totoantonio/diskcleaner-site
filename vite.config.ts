import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteCompression from "vite-plugin-compression"

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    ...(isSsrBuild ? [] : [
      viteCompression({ algorithm: "gzip" }),
      viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
    ]),
  ],
  base: "/",
  server: {
    proxy: {
      "/api/community": {
        target: "https://diskcleaner-api.totoantonio.workers.dev",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/community/, ""),
      },
      "/api/feedback": {
        target: "https://diskcleaner-feedback-api.totoantonio.workers.dev",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/feedback/, ""),
      },
    },
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    ...(isSsrBuild ? {} : {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            router: ["react-router-dom"],
          },
        },
      },
    }),
  },
}))
