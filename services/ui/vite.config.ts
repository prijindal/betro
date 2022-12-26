import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // include: ["@prijindal/betro-js-lib", "@prijindal/betro-js-client"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      // define: {
      //   global: "globalThis",
      // },
      // Enable esbuild polyfill plugins
      // plugins: [
      //   NodeGlobalsPolyfillPlugin({
      //     process: true,
      //     buffer: true,
      //   }),
      // ],
    },
  },
  build: {
    rollupOptions: {
      // external: ["@prijindal/betro-js-lib", "@prijindal/betro-js-client"],
      // plugins: [
      // Enable rollup polyfills plugin
      // used during production bundling
      // rollupNodePolyFill(),
      // ],
    },
  },
});
