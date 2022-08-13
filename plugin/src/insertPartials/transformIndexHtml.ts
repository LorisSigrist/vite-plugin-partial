import { Plugin, IndexHtmlTransformContext } from 'vite'
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import resolvePartialPath from './resolvePartialPath'
import findPartialTag from './findPartialTag'


const transformIndexHtml: Plugin['transformIndexHtml'] = async (html, ctx) => {
  let parseResult = findPartialTag(html)
  while (parseResult !== undefined) {

    const {startIndex, afterIndex, src } = parseResult;


    //Resolve the content of the partial
    let partialContent = ''
    if (src === '') {
      console.warn(
        `Warn: <vite-partial> tag at character ${startIndex} has an empty src="" attribute`
      )
    } else {
      const filePath = ctx.filename
      const serverRoot = ctx.server?.config.root
      if (!serverRoot) throw "Could not resolve vite's base directory"

      const path = await resolvePartialPath(src, filePath, serverRoot)

      try {
        partialContent = await getPartialContent(path)
      } catch (e) {
        console.log(path)
        throw new Error(
          `vite-plugin-partial: Could not read partial for <vite-partial src="${src}" /> make sure it exists"`
        )
      }
    }

    //Insert the content
    html =
      html.slice(0, startIndex) + partialContent + html.slice(afterIndex)

    parseResult = findPartialTag(html) //Find the next Tag, if there is one;
  }

  return html
}

async function getPartialContent (path: string): Promise<string> {
  const content = await readFile(path)
  return content.toString()
}

export default transformIndexHtml
