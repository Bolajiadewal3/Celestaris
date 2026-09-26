import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    allowedHosts: true, // or allowedHosts: ['.trycloudflare.com']
    host: true,
  },
  base: "/Celestaris/",

  build: {
    outDir: "dist",
  },
});
