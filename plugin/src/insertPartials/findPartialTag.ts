/* Regex Cheatsheet
    \s matches any whitespace
    \S matches anything but whitespace
    + means 1 or more of the previous
    * means 0 or more of the previous
    the g after the regex mans global. Aka. look for all matches, not just the first one
    (?<name>regex) is a named group. It takes anything the regex in the parentathese matches, and makes it accessible on match.group["name"];
    [^chars] means anything except the chars
    The y at the end makes it sticky. That means it will only look for a match at the exact location of regex.lastIndex
*/





/**
 *  Searches for the first <vite-partail src="..."> tag, and returns information about it (if it exists)
 *
 *  @return the position and src attribute of the tag
 *  @returns undefined if there is no tag
 *  @throws SyntaxError if the tag is malformed
 */
export default function findPartialTag (html: string): PartialTagSearchResult {
  //This function uses sticky regexes & the lastIndex property to only search from the specified index
  //Be mindful of how you manipulate these propertiess

  const tagStartRegex = /<vite-partial/
  const srcAttributeRegex = /[^>]*src="(?<src>.*)"/y
  const tagEndRegex = /.*\/>/y


  const tagStartMatch = html.match(tagStartRegex);
  if (!tagStartMatch || tagStartMatch.index === undefined) return undefined //No match found
  const startIndex = tagStartMatch.index

  //Start searching the src attribute after the tag start
  srcAttributeRegex.lastIndex = startIndex + tagStartMatch[0].length
  const srcAttributeMatch = srcAttributeRegex.exec(html)

  if (
    !srcAttributeMatch ||
    srcAttributeMatch.index == undefined ||
    !srcAttributeMatch.groups ||
    srcAttributeMatch.groups['src'] === undefined
  ) {
    throw SyntaxError(
      `The <vite-partial/> tag at character ${startIndex} does not have a "src" attribute. Currently this is mandatory`
    )
  }

  const src = srcAttributeMatch.groups.src

  const srcAttributeEndIndex =
    srcAttributeMatch.index + srcAttributeMatch[0].length
  tagEndRegex.lastIndex = srcAttributeEndIndex

  const tagEndMatch = tagEndRegex.exec(html)
  if (!tagEndMatch || tagEndMatch.index === undefined) {
    throw new SyntaxError(
      `Could not find end of <vite-partial> tag at character ${startIndex}. 
         Info: Currently all <vite-partial/> tags must be self closing`
    )
  }

  const afterIndex = tagEndMatch.index + tagEndMatch[0].length

  return {
    startIndex,
    afterIndex,
    src
  }

}

type PartialTagSearchResult =
  | {
      startIndex: number
      afterIndex: number
      src: string
    }
  | undefined