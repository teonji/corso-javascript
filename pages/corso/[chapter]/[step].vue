<script setup lang="ts">
import { computed } from 'vue'
import { useCourse } from '~/composables/course'
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import md5 from 'md5'

const route = useRoute()
const router = useRouter()
import useApi from '~/composables/api'

onMounted(async () => {
  learnt.value = useApi.getLearnt()

  // TODO: spostare prima?
  // TODO: steps?
  const redirectChapters = checkChapters(route.params, steps)
  if (redirectChapters) {
    await router.push(redirectChapters)
  }
})
const {
  chapters,
  learnt,
  checkChapters,
  findStepIndex,
  isLearnt,
} = await useCourse()

const functionStringify = fn => fn.toString()
    .split('\n')
    .slice(1, -1)
    .map(line => line.replace('    ', ''))
    .join('\n')

const chapter = route.params.chapter

let test = null
let verify = null
let help = null
const steps = await useApi.getSteps(chapter)

const step = await useApi.getStep(route.params)

if (step.test) {
  try {
    const fileRest = await import(`../../../test/${chapter}/${route.params.step}.js`)
    test = functionStringify(fileRest.default.step)
    verify = functionStringify(fileRest.default.verify)
    help = functionStringify(fileRest.default.help)
  } catch (e) {
    console.log(e)
  }
}

const currentChapterIndex = chapters.findIndex(c => c.path === `/${chapter}`)
const stepIndex = steps.findIndex(step => step.path === `/${chapter}/${route.params.step}`)
const prevStep = stepIndex > 0 ? steps[stepIndex - 1] : null
const nextStep = stepIndex === steps.length - 1 ? null : steps[stepIndex + 1]
const next = nextStep || chapters[currentChapterIndex + 1]

const savedTest = await useApi.getTest(step.path.substr(1))

const edited = ref(!!savedTest)
const content = ref(savedTest || '') // TODO: unificare con variabile savedTest?
const current = chapters[currentChapterIndex]

const errors = ref([])
const verifyTest = ref(null)
const menu = ref(false)

const stepPercentage = computed(() => ((stepIndex + 1) / steps.length) * 100)
const hasErrorCode = computed(() => errors.value.length > 0  )
const unlock = computed(() => {
  if (step.test) {
    return !hasErrorCode.value && edited.value && !verifyTest.value
  } else {
    return false
  }
})

const toggleMenu = () => {
  menu.value = !menu.value
}

const verifyCode = (data: any) => {
  errors.value = data.errors
  verifyTest.value = data.verify
  edited.value = data.edited
  content.value = data.content
}

const setLearntCode = async (path: string) => {
  const toAdd = md5(path)
  if (!learnt.value.includes(toAdd)) {
    learnt.value.push(toAdd)
    await useApi.setLearnt(learnt.value)
  }
}

const setLearnt = async () => {
  await setLearntCode(step.path)
  if (!nextStep) {
    await setLearntCode(current.path)
  }
}

const isStepNextEnabled = (step) => {
  const index = findStepIndex(steps, step)
  return !steps[index - 1]?.test || isLearnt(steps[index].path)
}

const goNextStep = async () => {
  if (unlock.value) {
    await setLearnt()
    if (next) {
      debugger
      await router.push(`/corso${next.path}`)
    } else {
      debugger
      await router.push('/corso/fine')
    }
    debugger
    await useApi.setTest({
      path: step.path.substr(1),
      content: content.value
    })
  } else if (isStepNextEnabled(nextStep)) {
    await setLearntCode(step.path)
    await router.push(`/corso${nextStep?.path}`)
  }
}
useHead({
  bodyAttrs: {
    class: step.test ? 'bg-sandy-brown text-black' : 'bg-persian-green text-white'
  }
})
</script>

<template>
  <div class="font-mono text-xl w-full h-full pb-24 overflow-auto" :class="[step.test ? 'bg-sandy-brown text-black' : 'bg-persian-green text-white']">
    <div class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 lg:grid-cols-3 bg-charcoal">
      <div class="fixed items-center justify-between space-x-2 w-full">
        <div class="w-full bg-gray-200 rounded-full h-1.5 bg-saffron">
          <div class="h-1.5 rounded-full bg-burnt-sienna" :style="`width: ${stepPercentage}%`" />
        </div>
      </div>
      <div class="px-8 items-center justify-center hidden mr-auto text-gray-300 lg:flex">
        <nuxt-link :to="current.slug" class="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-gray-600 hover:bg-gray-600">
          <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </nuxt-link>
        <span class="text-sm">{{ current.title }}</span>
      </div>
      <div class="hidden lg:flex items-center justify-center text-sm text-gray-300">
        {{ step.title }}
      </div>
      <div class="px-4 flex items-center">
        <div class="flex items-center justify-center w-full">
          <nuxt-link :to="current.slug" class="lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-gray-600 hover:bg-gray-600">
            <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </nuxt-link>
          <button class="lg:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-gray-600 hover:bg-gray-600" @click="toggleMenu">
            <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
          <div class="flex items-center justify-end w-full">
            <button v-if="step.test" class="hidden lg:block p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-gray-600 hover:bg-gray-600" @click="toggleMenu">
              <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
            <nuxt-link
              :to="prevStep ? `/corso${prevStep.path}` : `/corso${current.path}`"
              class="inline-flex items-center justify-center p-2.5 mx-2 font-medium rounded-full group focus:ring-4 focus:ring-persian-green focus:outline-none focus:ring-saffron"
              @click="goNextStep()"
            >
              <svg class="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" aria-hidden="true">
                <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" fill="currentColor" />
              </svg>
            </nuxt-link>

            <button
              :disabled="step.test && !unlock"
              :class="[!step.test ? 'cursor-pointer bg-persian-green hover:bg-saffron' : `text-gray-300 ${unlock ? 'bg-persian-green hover:bg-saffron cursor-pointer' : 'cursor-not-allowed bg-burnt-sienna hover:bg-sandy-brown'}`]"
              class="inline-flex items-center justify-center p-2.5 mx-2 font-medium rounded-full group focus:ring-4 focus:ring-persian-green focus:outline-none focus:ring-saffron"
              @click="goNextStep()"
            >
              <svg v-if="!step.test" class="w-5 h-5 text-white text-gray-300 group-hover:text-gray-900 group-hover:text-white" fill="currentColor" viewBox="0 0 320 512" aria-hidden="true">
                <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" fill="currentColor" />
              </svg>
              <svg
                v-else
                fill="none"
                class="w-5 h-5 text-white text-gray-300 group-hover:text-gray-900 group-hover:text-white"
                stroke="currentColor"
                stroke-width="3.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path v-if="!unlock" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                <path v-else d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="menu" class="bg-charcoal absolute right-0 bottom-24 w-full lg:w-1/4 bg-272822 z-10 overflow-auto" style="height: calc(100vh - 96px)">
      <step-menu :steps="steps" :step="step" />
    </div>
    <div v-if="!menu" class="lg:flex">
      <div class="w-full lg:w-3/4 px-4 lg:px-40">
        <div class="nuxt-content text-charcoal font-extrabold">
          <h1>{{ step.title }}</h1>
        </div>
        <content-renderer
          class="content-renderer"
          :class="{'pb-4': !step.test}"
          :value="step"
        />
        <div
          v-if="step.test"
          class="p-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased rounded-lg leading-normal overflow-hidden"
          :class="{
          'bg-burnt-sienna': hasErrorCode,
          'bg-burnt-sienna': !hasErrorCode && (edited && verifyTest),
          'bg-charcoal': !hasErrorCode && !edited,
          'bg-persian-green': edited && !verifyTest
          }"
        >
          <div class="flex">
            <div v-if="hasErrorCode">
              <div v-for="(e, i) in errors" :key="i">
                <span class="text-saffron">computer:~$</span>
                <span class="flex-1 typing items-center pl-2">
                  {{ e.text }} (row: {{ e.row + 1 }}, col: {{ e.column + 1 }})
                </span>
              </div>
            </div>
            <template v-else-if="edited">
              <span v-if="verifyTest" class="flex items-center h-full w-full">
                <span class="text-saffron pr-2">computer:~$</span>
                <span>{{ verifyTest }}</span>
              </span>
              <div v-else class="flex items-center justify-center h-full w-full text-center">
                <p class="text-white">
                  Esercizio passato!
                </p>
              </div>
            </template>
            <div v-else class="flex items-center justify-center h-full w-full">
              <span class="text-saffron">computer:~$</span>
              <span class="flex-1 typing items-center pl-2">
                Inizia a scrivere
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!step.test" class="hidden lg:block lg:w-1/4 lg:absolute right-0 top-0 bg-charcoal h-full overflow-auto" style="height: calc(100vh - 96px)">
        <step-menu :steps="steps" :step="step" />
      </div>
      <div v-if="step.test" class="lg:w-1/4 lg:absolute right-0 top-0 mx-0">
        <code-editor
          :value="savedTest || test"
          :verify="verify"
          :help="help"
          :next="next"
          @verify="verifyCode"
        />
      </div>
    </div>
  </div>
</template>
