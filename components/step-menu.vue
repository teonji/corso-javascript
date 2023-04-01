<script setup lang="ts">
import { useCourse } from '~/composables/course'
import useApi from '~/composables/api'
const {
  learnt,
  isLearnt,
} = await useCourse()
const props = defineProps({
  steps: Array,
  step: Object,
})
const latest = ref(-1)
onMounted(async () => {
  learnt.value = useApi.getLearnt()
  latest.value = (props?.steps || []).findLastIndex(s => isLearnt(s.path)) + 1
})
</script>

<template>
  <ol class="ml-8 border-l border-gray-200">
    <li v-for="(s, i) in steps" :key="`menu-${i}`" class="m-8">
      <span
        class="absolute flex items-center justify-center w-6 h-6 rounded-full left-5 ring-2"
        :class="steps[i === 0 ? 0 : i].path === step.path ? 'ring-sandy-brown bg-saffron text-charcoal' : (!isLearnt(steps[i === 0 ? 0 : i - 1].path) ? 'ring-gray-400 bg-gray-400 text-charcoal' : 'ring-white bg-white text-charcoal')"
      >
        <svg
          v-if="s.test"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="3.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      </span>
      <nuxt-link :to="isLearnt(steps[i === 0 ? 0 : i - 1].path) ? `/corso${s.path}` : '#'" :class="{'cursor-not-allowed': !isLearnt(steps[i === 0 ? 0 : i - 1].path)}">
        <h3 class="flex items-center mb-1 text-lg font-semibold" :class="isLearnt(steps[i === 0 ? 0 : i - 1].path) ? 'text-white' : 'text-gray-400'">
          <span>
            {{ s.title }}
          </span>
          <span v-if="i === latest" class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded bg-saffron text-charcoal ml-3">Latest</span>
        </h3>
        <p v-if="isLearnt(steps[i === 0 ? 0 : i - 1].path)" class="mb-4 text-base font-normal" :class="isLearnt(steps[i === 0 ? 0 : i - 1].path) ? 'text-gray-200' : 'text-gray-400'">
          {{ s.description }}
        </p>
      </nuxt-link>
    </li>
  </ol>
</template>
