import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wordle": {
        target: "https://api.frontendexpert.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wordle/, "/api/fe/wordle-words"),
      },
    },
  },
});
