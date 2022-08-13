import { resolve } from 'path'

/**
 * Resolve the absolute path to a partial.html file
 * It does **not** check if the given path actually exists
 *
 * @param src           The source attribute from a <vite-partial/> tag
 * @param filePath      The path of the file containing the <vite-partial/> tag (including the file)
 * @param rootDir       The projects root directory, as specified in vite.config.js
 *
 * @throws SyntaxError if the src attribute is invalid (empty or not a valid path)
 */
export default async function resolvePartialPath (
  src: string,
  filePath: string,
  rootDir: string
): Promise<string> {


  src = src.trim() //remove whitespace from start & end
  if (src === '')
    throw new SyntaxError("A <vite-partial/>'s src attribute may not be empty or just whitespace")
  if (!src.endsWith('.html'))
    throw new SyntaxError(
      "A partials must be an html file. Don't forget to specify the extention in the src attribut"
    )

  //Handle absolute path
  if (src.startsWith('/')) {
    //Remove the starting slash to make it a path relative to the rootDir
    src = src.slice(1)
    return resolve(rootDir, src);
  }
  //Handle Relative path
  else {
    //Remove the file itself from the path
    const pieces = filePath.split('/')
    const usedPieces : string [] = [];
    for (let i = 0; i < pieces.length-1; i++) {
        usedPieces.push(pieces[i]);
    }
    const directory = usedPieces.join("/");

    return resolve(directory, src);
  }
}
