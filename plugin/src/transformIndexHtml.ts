import { Plugin } from "vite";

const transformIndexHtml : Plugin["transformIndexHtml"]  = (html, ctx) => {

    //Match any <vite-partial src=""
    const matches = html.matchAll(/<vite-partial\s+src="(?<src>\S+)"/g);

    //TODO Make sure there is no overlap between the matches

    //Iterate over the matches & insert the partials
    for(const match of matches) {
        //Make sure 
        if(!match.groups) continue;
        const src = match.groups["src"];
        if(!src) continue;


        console.log(match.index, src);
    }
}

export default transformIndexHtml;