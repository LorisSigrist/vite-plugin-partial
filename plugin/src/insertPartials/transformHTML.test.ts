import {describe, it, expect, afterEach} from 'vitest';
import transformHTML from './transformHTML'

describe("transform html", ()=>{
    it("Throws when circular insertion", async()=>{
        const html = '<vite-partial src="/circular/first.html"/>'
        expect(async()=>{await transformHTML(html, "/circular/start.html", "/")}).rejects.toThrowError(SyntaxError)
    })
})