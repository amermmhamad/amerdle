import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // anything starting with /wordle will be proxied
      "/wordle": {
        target: "https://api.frontendexpert.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wordle/, "/api/fe/wordle-words"),
      },
    },
  },
});
