<script setup lang="ts">
const { siteName } = useRuntimeConfig().public
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <header class="border-b border-slate-800">
      <div class="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
        <span class="size-6 rounded bg-teal-400" aria-hidden="true" />
        <span class="font-semibold">{{ siteName }}</span>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-6 py-10">
      <slot />
    </main>
  </div>
</template>
