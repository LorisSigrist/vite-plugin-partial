import { Plugin, IndexHtmlTransformContext } from 'vite'
import { resolve } from 'path'
import { readFile } from 'fs/promises'


/* Regex Cheatsheet
    \s matches any whitespace
    \S matches anything but whitespace
    + means 1 or more of the previous
    * means 0 or more of the previous
    the g after the regex mans global. Aka. look for all matches, not just the first one
    (?<name>regex) is a named group. It takes anything the regex in the parentathese matches, and makes it accessible on match.group["name"];
    [^chars] means anything except the chars
*/

const tagStartRegex = /<vite-partial/;
const srcAttributeRegex = /^[^>]*src="(?<src>.*)"/;
const tagEndRegexes = [
    /^[^>\/]*\/>/,          //If the tag closes with />, it finds that. If it closes with > it doesn't find anything
    /<\/vite-partial\s*>/      //Finds the next </vite-partial> tag
]

const transformIndexHtml: Plugin['transformIndexHtml'] = async (html, ctx) => {
  let match = html.match(tagStartRegex)
  while (match) {
    const index = match.index
    const length = match[0].length
    if (index === undefined)
      throw new Error('RegExp match starts at index undefined')

    //Slice off anything past the starting tag
    const startIndex = index + length
    const htmlAfterTagOpen = html.slice(startIndex)

    //Find the src="" attribute
    const srcAttrMatch = htmlAfterTagOpen.match(srcAttributeRegex)
    if (
      !srcAttrMatch ||
      srcAttrMatch.index == undefined ||
      !srcAttrMatch.groups ||
      srcAttrMatch.groups['src'] === undefined
    )
      throw new Error(
        `<vite-partial> tag at ${index} has no src attribute. The src attribute is mandatory`
      )


    const src = srcAttrMatch.groups.src;
    const htmlAfterSrcAttribute = html.slice(srcAttrMatch.index + srcAttrMatch[0].length);


    //Resolve the content of the partial
    let partialContent = "";
    if (src === '') {
      console.warn(
        `Warn: <vite-partial> tag at ${index} has an empty src="" attribute`
      );
    }
    else {
        if(!src.endsWith(".html")) throw new Error(`<vite-partial> at ${index}: src attribute must point to an html file (ending in .html)`)

        //Non empty src attribute
        let path;
        if(src.startsWith("/")) {
            let serverRoot = ctx.server?.config.root
            if(!serverRoot) throw "Could not resolve vite's base directory";
            
            const pathFromRoot = src.slice(1); //Remove starting slash
            path = resolve(serverRoot, pathFromRoot);
        }else{
            const filename = ctx.filename;
            const directory = filename.replace(ctx.path, "/");

            path = resolve(directory, src);
        }


        try {
            partialContent = await getPartialContent(path);
        }catch(e) {
            throw new Error(`vite-plugin-partial: Could not read partial for <vite-partial src="${src} /> make sure it exists"`)
        }
        
    }

    

    console.log(partialContent);

    //Find end of the tag
    const possibleEndings : RegExpMatchArray[] = [];
    for(const regex of tagEndRegexes) {
        const match = htmlAfterSrcAttribute.match(regex);
        if(!match) continue;
        possibleEndings.push(match);
    }
    
    //Filter out all the non-matches. I dont know if this ever actually removes anything, but typescript complains, so it's here
    possibleEndings.filter(ending => ending.index !== undefined);




    break;
    match = html.match(tagStartRegex);
  }
}

async function getPartialContent(path : string) : Promise<string> {
    const content = await readFile(path);
    return content.toString();
}

export default transformIndexHtml
