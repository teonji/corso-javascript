<script setup lang="ts">
import useApi from '~/composables/api'
const chapters = await useApi.getChapters()
</script>

<template>
  <div class="font-mono">
    <section class="bg-persian-green">
      <div class="flex items-center max-w-screen-xl px-4 py-24 mx-auto">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-white">
            Corso di
            <span class="text-saffron">Javascript</span> online in Italiano
          </h1>
          <p class="max-w-2xl mb-6 text-charcoal font-bold lg:mb-8 md:text-lg lg:text-xl">
            Diventa uno sviluppatore JavaScript in pochi passi con questo corso base online!
          </p>
          <nuxt-link to="/corso" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-charcoal rounded-lg bg-sandy-brown hover:bg-burnt-sienna focus:ring-4 focus:ring-burnt-sienna">
            Inizia ora
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </nuxt-link>
        </div>
        <div class="hidden md:block md:w-1/3">
          <div class="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-charcoal  pb-6 pt-4 rounded-lg leading-normal overflow-hidden">
            <div class="top mb-2 flex">
              <div class="h-3 w-3 bg-red-500 rounded-full" />
              <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full" />
              <div class="ml-2 h-3 w-3 bg-green-500 rounded-full" />
            </div>
            <div class="mt-4 flex">
              <span class="text-green-400">javascript$</span>
              <p class="flex-1 typing items-center pl-2">
                impara gratis
                <br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-charcoal">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl font-extrabold text-white">
            Cosa imparerai
          </h2>
          <p class="sm:text-xl text-gray-400">
            Il corso ti insegnerà le basi del linguaggio di programmazione più popolare al mondo.
            Attraverso semplici slides, esempi pratici e brevi test, acquisirai le competenze necessarie per conoscere le basi del linguaggio.
            Il corso copre tutti gli argomenti essenziali, dalle variabili e gli operatori alle funzioni e agli oggetti.
          </p>
        </div>
        <div v-if="chapters.length" class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div v-for="(c, i) in chapters" :key="`chapter-${i}`">
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-persian-green">
              <svg class="w-5 h-5 lg:w-6 lg:h-6 text-charcoal" fill="none" stroke="currentColor" stroke-width="3.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">
              {{ c.title }}
            </h3>
            <p class="text-gray-400">
              {{ c.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-persian-green">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2 class="mb-4 text-4xl font-extrabold leading-tight text-white">
            Inizia ora il tuo primo corso Javascript.
          </h2>
          <h2 class="mb-4 font-extrabold leading-tight text-saffron text-8xl">
            GRATIS
          </h2>
          <p class="mb-6 text-white font-bold md:text-lg">
            Nessuna carta di credito richiesta.
          </p>
          <nuxt-link to="/corso" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-charcoal rounded-lg bg-sandy-brown hover:bg-burnt-sienna focus:ring-4 focus:ring-burnt-sienna">
            Inizia ora
            <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </nuxt-link>
        </div>
      </div>
    </section>

    <footer class="p-4 sm:p-6 bg-charcoal">
      <div class="mx-auto max-w-screen-xl">
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-persian-green sm:text-center">© {{ new Date().getFullYear() }} <a href="https://www.matteotritto.it/prjects/learnjs" class="hover:underline">teonji</a> 💜 All Rights Reserved.</span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <span class="text-sm text-persian-green">Contenuti generati da ChatGPT</span>
            <a href="https://github.com/teonji/learnjs" class="text-persian-green hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
            </a>
            <a href="https://www.matteotritto.it/projects/learnjs" class="text-persian-green hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
