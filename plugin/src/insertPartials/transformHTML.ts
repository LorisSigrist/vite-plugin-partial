import resolvePartialPath from './resolvePartialPath'
import findPartialTag from './findPartialTag'
import getPartialContent from './getPartialContent'

/**
 * Finds all the <vite-partial> tags in the html string, and includes them. This is called recursiveley if those partials also include partials
 * 
 * @param html the html string
 * @param filePath the absolute path of the html file being transformed
 * @param serverRoot the vite server root from which absolute imports are resolved
 * @param callstack an array of all the already included partials. Used to prevent circular insertion
 * @returns html string with partials inserted
 * @throws
 */
const transformHtml = async (html: string, filePath: string, serverRoot: string, callstack : string[] = []) => {
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
    const partialContent = await getPartialContent(path, serverRoot, callstack);

    //Insert the content into the html, replacing the <vite-partial> tag 
    html = html.slice(0, startIndex) + partialContent + html.slice(afterIndex)

    parseResult = findPartialTag(html) //Find the next Tag, if there is one;
  }

  return html
}

export default transformHtml
