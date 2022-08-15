import { Plugin } from 'vite'
import transformHtml from './insertPartials/transformHTML'

export default function vitePluginPartial (): Plugin {
  const options = {
    root: process.cwd()
  }

  return {
    name: 'vite-plugin-partial',
    enforce: 'pre', //We want to run before vite does it's thing, so that any scripts that are added by partials are also transformed

    //Called when the vite.config.js gets parsed. Use this to remember the root
    configResolved (config) {
      options.root = config.root
    },

    //Called whenever an entry-point html file gets called
    transformIndexHtml: async (html, ctx) => {
      const filePath = ctx.filename
      const serverRoot = options.root
      if (!serverRoot) throw "Could not resolve vite's base directory"
    
      return await transformHtml(html, filePath, serverRoot);
    },
    
    //Called whenever any file in the project changes
    handleHotUpdate ({ file, server }) {
      if (file.endsWith(".html")) {
        //Trigger full reload on all paths (check issue #5 to see why all)
        server.ws.send({ type: 'full-reload', path: '*' })
      }
    }
  }
}
