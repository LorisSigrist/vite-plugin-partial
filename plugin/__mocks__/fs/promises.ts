//Must be before imports, because mock-definitions are hoisted
async function mockFsRead (path: string): Promise<Buffer> {
  switch (path) {
    case '/simple.html': {
      return Buffer.from('<h1>HelloWorld<h1>')
    }

    case '/with-partial.html': {
      return Buffer.from('<p><vite-partial src="/simple.html"/></p>')
    }

    case '/subdirectory/with-relative-partial.html': {
      return Buffer.from('<p><vite-partial src="./../simple.html"/></p>')
    }

    case '/subdirectory/with-absolute-partial.html': {
      return Buffer.from('<p><vite-partial src="/simple.html"/></p>')
    }

    case '/root/index.html': {
      return Buffer.from('<p><vite-partial src="/partial.html"/></p>')
    }

    case '/root/partial.html': {
      return Buffer.from('<h1>HelloWorld<h1>')
    }

    case '/circular/first.html' : {
      return Buffer.from('<h1><vite-partial src="/circular/second.html"/><h1>')
    }

    case '/circular/second.html' : {
      return Buffer.from('<h1><vite-partial src="/circular/first.html"/><h1>')
    }

    default:
      throw new Error('File not found')
  }
}

export default { readFile: mockFsRead }
