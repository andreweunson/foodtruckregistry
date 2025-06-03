import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/place": {
        target: "https://places.googleapis.com/v1/places:autocomplete",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/place/, ""),
      },
      "/geocode": {
        target: "https://maps.googleapis.com/maps/api/geocode/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geocode/, ""),
      },
    },
  },
  plugins: [react()],
});
