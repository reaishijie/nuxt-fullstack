<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

// 服务端 API 数据预取测试
const { data, error } = await useFetch('/api/hello')
const counter = useCounterStore()

useHead({ title: 'Nuxt 全栈起步' })
</script>

<template>
  <section class="rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl">
    <h1 class="mb-2 text-3xl font-extrabold text-teal-400">Nuxt + Tailwind</h1>
    <p class="mb-4 text-slate-400">全栈环境配置成功</p>

    <div
      class="mb-6 rounded border border-slate-800 bg-slate-950 px-4 py-2 font-mono text-sm text-emerald-400"
    >
      <span v-if="error" class="text-rose-400">API 请求失败：{{ error.message }}</span>
      <span v-else>{{ data?.message ?? '正在加载后端 API...' }}</span>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="rounded bg-teal-400 px-4 py-2 font-medium text-slate-900 transition hover:bg-teal-300"
        @click="counter.increment()"
      >
        count: {{ counter.count }}
      </button>
      <button
        type="button"
        class="rounded border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-400"
        @click="counter.reset()"
      >
        重置
      </button>
    </div>
    <p class="mt-3 text-sm text-slate-500">double: {{ counter.double }}</p>
  </section>
</template>
