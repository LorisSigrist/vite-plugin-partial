import findPartialTag from './findPartialTag'
import { describe, it, expect } from 'vitest'

describe('<vite-partial> parsing', () => {
  it('Returns undefined it there is no tag', () => {
    const result = findPartialTag('<html><head></head></html>')
    expect(result).toBeUndefined()
  })

  it('Parses self-closing vite-partial tag with src attribute', () => {
    const html = '<html><vite-partial src="partial.html"/></html>'
    const result = findPartialTag(html)

    expect(result).toBeDefined()
    expect(result?.src).toBe('partial.html')
    expect(html.substring(0, result?.startIndex)).toBe("<html>");
    expect(html.substring(result?.afterIndex ?? 0)).toBe("</html>");
  })

  it('Throws SyntaxError if the <vite-partial is not closed', ()=> {
    const html = '<html><vite-partial src="partial.html"  ';
    expect(()=>findPartialTag(html)).toThrowError(SyntaxError);
  })

  it('Returns undefined src when src attribute is missing', ()=> {
    const html = '<html><vite-partial/></html>';
    const result = findPartialTag(html)
    expect(result).toBeDefined();
    expect(result?.src).toBeUndefined();
  })

  it('Parses vite-partial tag with closing tag and src attribute', ()=>{
    const html = '<html><vite-partial src="partial.html"><p>hello world</p></vite-partial></html>'
    const result = findPartialTag(html)

    expect(result).toBeDefined();
    expect(result?.src).toBe("partial.html");
    expect(html.substring(0,result?.startIndex)).toBe("<html>")
    expect(html.substring(result?.afterIndex ?? 0)).toBe("</html>")
  })

  it('Parses vite-partial tag with closing tag and no src attribute', ()=>{
    const html = '<html><vite-partial><p>hello world</p></vite-partial></html>'
    const result = findPartialTag(html)

    expect(result).toBeDefined();
    expect(result?.src).toBeUndefined();
    expect(html.substring(0,result?.startIndex)).toBe("<html>")
    expect(html.substring(result?.afterIndex ?? 0)).toBe("</html>")
  })

  it('Throws SyntaxError on nested self-closing <vite-partial> tags', ()=>{
    const html = '<html><vite-partial><p><vite-partial/></p></vite-partial></html>'
    expect(()=>findPartialTag(html)).toThrowError(SyntaxError);
  })

  it('Throws SyntaxError on nested <vite-partial> tags', ()=>{
    const html = '<html><vite-partial><vite-partial></vite-partial></vite-partial></html>'
    expect(()=>findPartialTag(html)).toThrowError(SyntaxError);
  })


})
