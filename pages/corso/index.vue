<script setup lang="ts">
import { computed } from 'vue'
import { useCourse } from '~/composables/course'
import useApi from "~/composables/api"
const router = useRouter()

const {
  chapters,
  learnt,
  isChapterEnabled,
} = await useCourse()

onMounted(() => {
  learnt.value = useApi.getLearnt()
})
const completed = computed(() => {
  const enabled = chapters.filter(c => isChapterEnabled(c))
  return (enabled.length / chapters.length) * 100
})
const goNextChapter = async (step: any) => {
  if (isChapterEnabled(step)) {
    await router.push(`/corso${step.path}`)
  }
}
</script>

<template>
  <div class="font-mono h-screen bg-saffron text-charcoal overflow-hidden">
    <div class="absolute bg-saffron w-full top-0 right-0 left-0">
      <div class="flex pl-4 md:pl-[40px] items-center h-[80px]">
        <nuxt-link to="/" class="flex items-center">
          <svg
              class="w-8 h-8 mr-2"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home
        </nuxt-link>
      </div>
    </div>
    <div class="container p-4 pt-24 md:p-32 m-auto h-screen overflow-auto">
      <h1 class="text-3xl font-bold font-extrabold md:text-6xl pb-8">
        // Corso Javascript
      </h1>
      <div class="w-full rounded-full h-2.5 bg-sandy-brown mb-8">
        <div class="h-2.5 rounded-full bg-burnt-sienna" :style="`width: ${completed}%`" />
      </div>
      <div v-for="(c, i) in chapters" :key="i" class="pb-8">
        <div
            :class="[isChapterEnabled(c) ? 'cursor-pointer' : 'cursor-not-allowed opacity-30']"
            @click="goNextChapter(c)"
        >
          <h2 class="md:text-2xl text-lg font-bold">
            // {{ i + 1 }} - {{ c.title }}
          </h2>
          <p class="text-sm md:text-base">
            {{ c.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
