import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    include: ["tests/*.test.{js,jsx,ts,tsx}"],
    environment: "jsdom",
    setupFiles: "setupTests.js",
    globals: true,
  },
});
