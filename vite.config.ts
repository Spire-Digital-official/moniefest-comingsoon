import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    // Default base for deployments. Use the repo name path for GitHub Pages.
    // This can be overridden by setting the VITE_BASE env var or passing
    // `--base` to `vite build` (the `build:gh` script already does this).
    base: process.env.VITE_BASE || '/moniefest-comingsoon/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
