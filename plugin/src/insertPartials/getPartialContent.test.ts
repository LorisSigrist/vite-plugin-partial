import getPartialContent from './getPartialContent'
import { describe, it, expect, vi, afterEach } from 'vitest'

describe('Reading Partial Files', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Returns file contents if the path & file are valid', async () => {
    expect(await getPartialContent('/simple.html', '/',[])).toBe(
      '<h1>HelloWorld<h1>'
    )
  })

  it('includes partials in the loaded partial', async () => {
    expect(await getPartialContent('/with-partial.html', '/',[])).toBe(
      '<p><h1>HelloWorld<h1></p>'
    )
  })

  it('includes partials with relative paths in the loaded partial', async () => {
    expect(
      await getPartialContent('/subdirectory/with-relative-partial.html', '/',[])
    ).toBe('<p><h1>HelloWorld<h1></p>')
  })

  it('includes partials with absolute paths in the loaded partial', async () => {
    expect(
      await getPartialContent('/subdirectory/with-absolute-partial.html', '/',[])
    ).toBe('<p><h1>HelloWorld<h1></p>')
  })

  it('resolved absolute partial paths relative to the given root', async () => {
    expect(
      await getPartialContent('/root/index.html', '/root/', [])
    ).toBe('<p><h1>HelloWorld<h1></p>')
  })

    
  it('Throws if the path is invalud', async () => {
    expect(async () => {
      await getPartialContent('asdfxgchvjbnk', '/',[])
    }).rejects.toThrowError()
  })
})
