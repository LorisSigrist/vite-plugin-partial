import type { Plugin } from "vite"
import transformIndexHtml from "./insertPartials/transformIndexHtml"

export default function vitePluginPartial() : Plugin{
    return {
        name : "vite-plugin-partial",
        enforce: 'pre', //We want to run before vite does it's thing, so that any scripts that are added by partials are also transformed
        transformIndexHtml,
    }
}