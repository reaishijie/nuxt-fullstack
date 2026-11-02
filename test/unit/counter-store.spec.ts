import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCounterStore } from '~/stores/counter'

describe('useCounterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('默认从 0 开始', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    expect(store.double).toBe(0)
  })

  it('increment 累加 count 并同步 double', () => {
    const store = useCounterStore()
    store.increment()
    store.increment(2)
    expect(store.count).toBe(3)
    expect(store.double).toBe(6)
  })

  it('reset 归零', () => {
    const store = useCounterStore()
    store.increment(5)
    store.reset()
    expect(store.count).toBe(0)
  })
})
