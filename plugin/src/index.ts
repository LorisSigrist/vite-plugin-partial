import type { Plugin } from "vite"
import transformHtml from "./insertPartials/transformHTML"

export default function vitePluginPartial() : Plugin{
    return {
        name : "vite-plugin-partial",
        enforce: 'pre', //We want to run before vite does it's thing, so that any scripts that are added by partials are also transformed
        transformIndexHtml: async (html, ctx)=> {
            const filePath = ctx.filename
            const serverRoot = ctx.server?.config.root
            if (!serverRoot) throw "Could not resolve vite's base directory"
            return await transformHtml(html, filePath, serverRoot);
        }
    }
}