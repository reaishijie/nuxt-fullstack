import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

await setup({
  rootDir: fileURLToPath(new URL('../..', import.meta.url)),
  server: true,
  browser: false
})

describe('Nitro API', () => {
  it('GET /api/hello 返回后端消息', async () => {
    const res = await $fetch<{ message: string }>('/api/hello')
    expect(res.message).toBe('Hello from Nuxt Nitro Backend!')
  })
})

describe('页面 SSR', () => {
  it('首页同时渲染 API 数据与 Tailwind 结构', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('Nuxt + Tailwind')
    expect(html).toContain('Hello from Nuxt Nitro Backend!')
    expect(html).toContain('bg-slate-900')
  })
})
