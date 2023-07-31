import react from '@vitejs/plugin-react';
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index"),
      name: "josenanodev-react-components-library",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});
