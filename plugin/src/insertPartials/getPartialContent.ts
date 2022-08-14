import { readFile } from 'fs/promises'
import transformHtml from './transformHTML'


/**
 * Returns the content of a given path as a string.
 *
 * @param path the filesystem path to the partial that needs to be inserted
 * @param serverRoot the root directory from which files are resolved. Necessary if the partial also inserts partials
 * 
 * @throws SyntaxError if the file tries to import any other partials
 */
export default async function getPartialContent (
  filePath: string,
  serverRoot: string,
): Promise<string> {
  let html

  try {
    const fileContent = await readFile(filePath)
    html = fileContent.toString()
  } catch (e) {
    throw Error('Could not read partial at path ' + filePath)
  }

  const transformedHTML = transformHtml(html, filePath, serverRoot);
  return transformedHTML;
}