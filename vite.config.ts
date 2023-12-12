import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // global: 'globalThis',
    global: (() => {
      let globalVariable = "globalThis";
      try {
        require.resolve("@safe-global/safe-apps-provider");
        require.resolve("@safe-global/safe-apps-sdk");
        globalVariable = "global";
      } catch (e) {
        globalVariable = "globalThis";
      }
      return globalVariable;
    })(),
  },
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  plugins: [react()],
});
