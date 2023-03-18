import { globSync } from 'glob'
const routes = globSync('./content/**/*.md')
  .map(path => `/corso${path.slice(7, -3)}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
  ],
  nitro: {
    prerender: {
      routes
    }
  },
  content: {
    highlight: {
      theme: 'monokai'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.scss'
  }
})
