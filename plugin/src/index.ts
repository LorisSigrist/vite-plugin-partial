import type { Plugin } from "vite"

export default function vitePluginPartial() : Plugin{
    return {
        name : "vite-plugin-partial",
        enforce: 'pre', //We want to run before vite does it's thing, so that any scripts that are added by partials are also transformed
        transformIndexHtml : (html, ctx)=> {
            return html.replace("Please Replace this", ctx.filename);
        }
    }
}