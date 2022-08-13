import { readFile } from 'fs/promises'

/**
 * Returns the content of a given path as a string.
 *
 * @throws SyntaxError if the file tries to import any other partials
 */
export default async function getPartialContent (
  path: string
): Promise<string> {
  let html

  try {
    const fileContent = await readFile(path)
    html = fileContent.toString()
  } catch (e) {
    throw Error('Could not read partial at path ' + path)
  }

  if (html.includes('<vite-partial')) {
    throw SyntaxError('Partials can not themselves include partials')
  }

  return html
}