import resolvePartialPath from './resolvePartialPath'
import { describe, it, expect } from 'vitest'

const exampleFilePath = '/User/test/app/src/index.html'
const exampleRootPath = '/User/test/app/src/'

describe('Resolve partial path', () => {
  it('Throws on empty src', async () => {
    expect(async () => {
      await resolvePartialPath('', exampleFilePath, exampleRootPath)
    }).rejects.toThrow()
  })

  it("Throws if partial isn't an html file", async () => {
    expect(async () => {
      await resolvePartialPath('partial.json', exampleFilePath, exampleRootPath)
    }).rejects.toThrow()
  })

  it('Resolves relative path without ./', async ()=> {
    const path = await resolvePartialPath('partial.html', exampleFilePath, exampleRootPath)
    expect(path).toBe("/User/test/app/src/partial.html")
  })

  it('Resolves relative path with ./', async ()=> {
    const path = await resolvePartialPath('./partial.html', exampleFilePath, exampleRootPath)
    expect(path).toBe("/User/test/app/src/partial.html")
  })

  it('Resolves relative path starting with ../', async ()=> {
    const path = await resolvePartialPath('../src/partial.html', exampleFilePath, exampleRootPath)
    expect(path).toBe("/User/test/app/src/partial.html")
  })

  it('Resolves absolute path', async ()=> {
    const path = await resolvePartialPath('/partials/partial.html', exampleFilePath, exampleRootPath)
    expect(path).toBe("/User/test/app/src/partials/partial.html")
  })
})
