// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
  ],
  content: {
    highlight: {
      theme: 'monokai'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.scss'
  }
})
