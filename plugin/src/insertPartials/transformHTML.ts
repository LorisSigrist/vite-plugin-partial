import { Plugin } from 'vite'
import resolvePartialPath from './resolvePartialPath'
import findPartialTag from './findPartialTag'
import getPartialContent from './getPartialContent'

const transformIndexHtml = async (html: string, filePath: string, serverRoot: string) => {
  let parseResult = findPartialTag(html)
  while (parseResult !== undefined) {
    const { startIndex, afterIndex, src } = parseResult

    //If the src attribute is empty or missing, just return the html with the <vite-partial> tag removed
    if (!src || src === '') {
      console.warn(
        `Warn: <vite-partial> tag at character ${startIndex} has an empty or missing src="" attribute`
      )
      html = html.slice(0, startIndex) + html.slice(afterIndex)
      parseResult = findPartialTag(html) //Find the next Tag, if there is one;
      continue;
    }

    const path = await resolvePartialPath(src, filePath, serverRoot)
    const partialContent = await getPartialContent(path)

    //Insert the content into the html, replacing the <vite-partial> tag 
    html = html.slice(0, startIndex) + partialContent + html.slice(afterIndex)

    parseResult = findPartialTag(html) //Find the next Tag, if there is one;
  }

  return html
}

export default transformIndexHtml
