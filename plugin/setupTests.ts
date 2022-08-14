import { vi } from 'vitest'
import fsPromisesMock from './__mocks__/fs/promises'

vi.mock('fs/promises', async () => {
  return fsPromisesMock;
})
