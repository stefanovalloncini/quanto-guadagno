/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

const VENDOR_PACKAGES = new Set([
  "react",
  "react-dom",
  "react-router",
  "react-router-dom",
  "react-intl",
  "scheduler",
]);

function packageOf(id: string): string {
  const tail = id.split("node_modules/").pop() ?? "";
  const parts = tail.split("/");
  const first = parts[0] ?? "";
  return first.startsWith("@") ? `${first}/${parts[1] ?? ""}` : first;
}

function isVendor(name: string): boolean {
  return (
    VENDOR_PACKAGES.has(name) ||
    name.startsWith("@formatjs/") ||
    name.startsWith("intl-messageformat")
  );
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules") && isVendor(packageOf(id))) return "vendor";
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/domain/**/*.ts", "src/adapters/**/*.ts", "src/ui/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/index.ts"],
    },
  },
});
