import { it, describe, expect } from 'vitest'
import vitePluginPartial from '.'

describe('vite-plugin-partial', () => {
    it("has the name 'vite-plugin-partial'", () => {
    const plugin = vitePluginPartial()
    expect(plugin.name).toBe('vite-plugin-partial')
  })
})
