import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginPartial from 'vite-plugin-partial'

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  root,
  publicDir,
  plugins: [vitePluginPartial()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        //Register all html files here
        main: resolve(root, "index.html"),
      },
    },
  },
});
