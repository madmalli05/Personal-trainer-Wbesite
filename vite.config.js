import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base ("./") so the built site works on ANY static host
// (Netlify, Vercel, GitHub Pages project sites, a sub-folder, etc.)
// without extra configuration.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
