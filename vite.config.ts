import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: "index.html", dashboard: "dashboard.html" },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
