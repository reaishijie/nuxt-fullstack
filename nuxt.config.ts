import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // 仅服务端可读，用环境变量 NUXT_API_SECRET 覆盖
    apiSecret: '',
    public: {
      siteName: 'Nuxt 全栈起步',
      apiBase: '/api'
    }
  },

  eslint: {
    // 交给 Prettier 处理风格，ESLint 只做代码质量
    config: { stylistic: false }
  },

  vite: {
    plugins: [tailwindcss()]
  }
})
