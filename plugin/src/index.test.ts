import { it, describe, expect } from 'vitest'
import vitePluginPartial from '.'

describe('Plugin configuration', () => {
  it("has the name 'vite-plugin-partial'", () => {
    const plugin = vitePluginPartial()
    expect(plugin.name).toBe('vite-plugin-partial')
  })

  it('Runs before the vite core modules', () => {
    const plugin = vitePluginPartial()
    expect(plugin.enforce).toBe('pre')
  })
})
