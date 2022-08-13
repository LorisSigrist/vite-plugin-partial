import { Plugin } from 'vite'
import resolvePartialPath from './resolvePartialPath'
import findPartialTag from './findPartialTag'
import getPartialContent from './getPartialContent'

const transformIndexHtml: Plugin['transformIndexHtml'] = async (html, ctx) => {
  let parseResult = findPartialTag(html)
  while (parseResult !== undefined) {
    const { startIndex, afterIndex, src } = parseResult

    //If the src attribute is empty, just return the html with the <vite-partial> tag removed
    if (src === '') {
      console.warn(
        `Warn: <vite-partial> tag at character ${startIndex} has an empty src="" attribute`
      )
      html = html.slice(0, startIndex) + html.slice(afterIndex)
    }


    const filePath = ctx.filename
    const serverRoot = ctx.server?.config.root
    if (!serverRoot) throw "Could not resolve vite's base directory"

    const path = await resolvePartialPath(src, filePath, serverRoot)
    const partialContent = await getPartialContent(path)

    //Insert the content into the html, replacing the <vite-partial> tag 
    html = html.slice(0, startIndex) + partialContent + html.slice(afterIndex)

    parseResult = findPartialTag(html) //Find the next Tag, if there is one;
  }

  return html
}

export default transformIndexHtml
