//Must be before imports, because mock-definitions are hoisted
async function mockFsRead (path: string): Promise<Buffer> {
  switch (path) {
    case '/valid.html': {
      return Buffer.from('<h1>HelloWorld<h1>')
    }

    case '/invalid.html': {
      return Buffer.from('<vite-partial src="otherPartial.html"/>')
    }

    default:
      throw new Error("File not found");
  }
}

import getPartialContent from './getPartialContent'
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'

describe('Reading Partial Files', () => {
  beforeAll(() => {
    vi.mock('fs/promises', () => {
      return { readFile: mockFsRead }
    })
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('Returns file contents if the path & file are valid', async () => {
    expect(await getPartialContent('/valid.html')).toBe('<h1>HelloWorld<h1>')
  })

  it('Throws syntax error if a partial tries to include another partial', async () => {
    expect(async () => {
      await getPartialContent('/invalid.html')
    }).rejects.toThrowError(SyntaxError)
  })

  it('Throws if the path is invalud', async () => {
    expect(async () => {
      await getPartialContent('asdfxgchvjbnk')
    }).rejects.toThrowError();
  })


})
