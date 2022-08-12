import type { Plugin } from "vite"

export default function vitePluginPartial() : Plugin{
    return {
        "name" : "vite-plugin-partial",
        "transformIndexHtml" : (html)=> {
            return html.replace("Please Replace this", "I have replaced it");
        }
    }
}