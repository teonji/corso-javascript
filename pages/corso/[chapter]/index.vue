<script setup lang="ts">
import { computed } from 'vue'
import { useCourse } from '~/composables/course'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
import useApi from '~/composables/api'

onMounted(() => {
  learnt.value = useApi.getLearnt()

  // TODO: move it
  const redirectChapters = checkChapters(route.params)
  if (redirectChapters) {
    router.push(redirectChapters)
  }
})
const {
  learnt,
  checkChapters,
  isStepEnabled,
} = await useCourse()

let chapter = null
let steps = []
try {
  chapter = await useApi.getChapter(route.params.chapter)
  steps = await useApi.getSteps(route.params.chapter)
} catch (e) {
  router.push('/corso')
}

const completed = computed(() => {
  const enabled = steps.filter(s => isStepEnabled(steps, s))
  return (enabled.length / steps.length) * 100
})
const testCompleted = computed(() => {
  const withTest = steps.filter(s => s.test)
  const enabledWithTest = withTest.filter(s => isStepEnabled(steps, s))
  return (enabledWithTest.length / withTest.length) * 100
})
const goStep = async (step: any) => {
  if (isStepEnabled(steps, step)) {
    await router.push(step.slug)
  }
}
</script>

<template>
  <div class="bg-sandy-brown md:h-screen text-charcoal">
    <div class="fixed bg-sandy-brown w-full top-0 h-24">
      <div class="h-full mx-auto px-4 lg:px-48 md:px-12 flex justify-between">
        <nuxt-link to="/corso" class="flex items-center items-center">
          <svg
            class="w-8 h-8 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Corso
        </nuxt-link>
        <div class="md:hidden block flex items-center justify-between">
          <div class="w-24 rounded-full h-2.5 bg-saffron">
            <div class="h-2.5 rounded-full" :class="testCompleted === 100 ? 'bg-persian-green' : 'bg-burnt-sienna'" :style="`width: ${testCompleted}%`" />
          </div>
          <small class="ml-2">Test</small>
        </div>
      </div>
    </div>
    <div class="h-full mx-auto px-4 lg:px-48 md:px-12 pt-24 overflow-auto">
      <div class="pb-8">
        <div v-if="chapter" class="text-3xl md:text-6xl font-bold flex items-center justify-between">
          <h1 class="font-extrabold">// {{ chapter.title }}</h1>
          <div class="hidden md:flex items-center justify-between text-xl">
            <small class="mr-2">Test</small>
            <div class="w-48 rounded-full h-2.5 bg-saffron">
              <div class="h-2.5 rounded-full bg-burnt-sienna" :style="`width: ${testCompleted}%`" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full rounded-full h-2.5 bg-saffron mb-8">
        <div class="h-2.5 rounded-full bg-burnt-sienna" :style="`width: ${completed}%`" />
      </div>
      <div v-for="(s, i) in steps" :key="i" class="pb-8">
        <div
          :class="isStepEnabled(steps, s) ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'"
          @click="goStep(s)"
        >
          <div class="md:text-2xl text-lg font-bold flex items-center">
            <span>//  {{ i + 1 }} - {{ s.title }}</span>
            <svg
              v-if="s.test"
              class="w-8 h-8 ml-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <p class="text-sm md:text-base">
            {{ s.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
