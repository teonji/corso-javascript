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
  <div class="font-mono h-screen bg-purple-600 text-white overflow-auto">
    <div class="absolute bg-purple-600 w-full top-0 right-0 left-0">
      <div class="flex px-4 md:pl-[40px] items-center justify-between h-[80px]">
        <nuxt-link to="/corso" class="flex items-center">
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
          <div class="w-24 rounded-full h-2.5 bg-gray-700">
            <div class="h-2.5 rounded-full" :class="testCompleted === 100 ? 'bg-green-500' : 'bg-white'" :style="`width: ${testCompleted}%`" />
          </div>
          <small class="ml-2">Test</small>
        </div>
      </div>
    </div>
    <div class="container p-4 pt-24 md:p-32 m-auto">
      <div class="pb-8">
        <div v-if="chapter" class="text-3xl md:text-6xl font-bold flex items-center justify-between">
          <h1>// {{ chapter.title }}</h1>
          <div class="hidden md:flex items-center justify-between text-xl">
            <small class="mr-2">Test</small>
            <div class="w-48 rounded-full h-2.5 bg-gray-700">
              <div class="h-2.5 rounded-full" :class="testCompleted === 100 ? 'bg-green-500' : 'bg-white'" :style="`width: ${testCompleted}%`" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full rounded-full h-2.5 bg-gray-700 mb-8">
        <div class="h-2.5 rounded-full" :class="completed === 100 ? 'bg-green-500' : 'bg-white'" :style="`width: ${completed}%`" />
      </div>
      <div v-for="(s, i) in steps" :key="i" class="pb-8">
        <div
          :class="isStepEnabled(steps, s) ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'"
          @click="goStep(s)"
        >
          <div class="md:text-xl text-lg font-bold flex items-center">
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
