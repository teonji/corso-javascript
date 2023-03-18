import ace from 'ace-builds'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import workerJavascript from 'ace-builds/src-noconflict/worker-javascript'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VAceEditor)
  ace.config.setModuleUrl('ace/mode/json_worker', workerJavascript)
})
