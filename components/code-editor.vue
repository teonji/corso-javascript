<script setup lang="ts">
import { ref, computed } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'

const emit = defineEmits(['verify'])
const props = defineProps({
  value: String,
  verify: String,
  help: String,
  next: Object
})
const annotations = ref([])
const innerValue = ref((props.value || '').replace(/;/g, ''))
const edited = ref(false)
const showRun = ref(false)
const code = ref(null)

const errors = computed(() => annotations.value.filter(item => item.type === 'error'))
const verifyFn = computed(() => '() => {' + innerValue.value + ';\n\n ' + props.verify + '}')
const verifyTest = computed(() => {
  try {
    return eval(verifyFn.value)()
  } catch (e) {
    return e.message
  }
})

const editorInit = async () => {
  // code?.value.editor.getSession().on('changeAnnotation', () => {
  //   const annotations = code?.value.editor.getSession().getAnnotations()
  //   annotations.value = annotations
  //   // _self.$emit('annotations', annotations)
  // })

  //   _self.$nextTick(() => {
//     _self.$refs.code.editor.getSession().on('changeAnnotation', () => {
//       const annotations = _self.$refs.code.editor.getSession().getAnnotations()
//       _self.annotations = annotations
//       _self.$emit('annotations', annotations)
//     })
//     _self.$refs.code.editor.addEventListener('blur', () => {
//       return this.$emit('input', _self.innerValue)
//     }, true)
//   })
}

const input = computed(() => {
  if (innerValue.value) {
    edited.value = true
    if (innerValue.value === '') {
      annotations.value = []
    }
    showRun.value = true
  }
})
const run = () => {
  showRun.value = false
  emit('verify', {
    errors: errors.value,
    verify: verifyTest.value,
    edited: edited.value,
    content: innerValue.value
  })
}
const toggleHelp = async () => {
  innerValue.value = props.help.replace(/;/g, '')
  await run()
}

</script>

<template>
  <div class="md:h-screen h-full flex flex-col mt-8 lg:mt-0">
    <button v-if="showRun" class="fixed right-4 bottom-28 z-20 text-charcoal bg-saffron hover:bg-sandy-brown focus:ring-4 focus:ring-sandy-brown font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" @click="run">
      Run
      <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    </button>
    <button type="button" class="fixed lg:right-2 lg:left-auto left-2 lg:top-4 bottom-28 lg:bottom-auto z-20 text-white bg-persian-green hover:bg-sandy-brown focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center mr-2 " @click="toggleHelp">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </button>
    <client-only>
      <v-ace-editor
        ref="code"
        v-model:value="innerValue"
        theme="monokai"
        lang="javascript"
        style="height: calc(100vh - 96px)"
        @input="input"
        @init="editorInit"
      />
<!--         :options="{ useWorker: true }"-->
     </client-only>
  </div>
</template>
