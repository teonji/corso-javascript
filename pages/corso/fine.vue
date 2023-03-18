<template>
  <div class="font-mono h-screen bg-orange-500 text-white overflow-auto">
    <div class="container md:p-24 m-auto text-right">
      <h1 class="text-6xl h-[10vh] pt-4">
        FINE
      </h1>
      <!--      <div class="h-[90vh] md:h-[70vh]">
        <ace-editor
          ref="code"
          :value="innerValue"
          theme="monokai"
          lang="javascript"
          @init="editorInit"
        />
      </div>-->
    </div>
  </div>
</template>

<script>
/* import learntMixin from '../../mixins/learnt'
import { getChapters, getLearntCode, getLearnt } from '../../utils'
export default {
  name: 'CorsoEndPage',
  mixins: [learntMixin],
  async asyncData ({ $content, redirect }) {
    try {
      const learnt = getLearnt()
      const chapters = await getChapters($content)
      if (!chapters.every(c => learnt.includes(getLearntCode(c.path)))) {
        return redirect('/corso')
      }
    } catch (e) {
      return redirect('/corso')
    }
  },
  data () {
    return {
      innerValue: `

       _________        .---"""      """---.
:______.-':      :  .---------------.  :
| ______  |      | :                 : |
|:______B:|      | |  Complimenti:   | |
|:______B:|      | |                 | |
|:______B:|      | |  Corso superato | |
|         |      | |  con successo.  | |
|:_____:  |      | |                 | |
|    ==   |      | :                 : |
|       O |      :  '---------------'  :
|       o |      :'---...______...---'
|       o |-._.-i___/'             \\._
|'-.____o_|   '-.   '-...______...-'  \`-._
:_________:      \`.____________________   \`-.___.-.
                 .'.eeeeeeeeeeeeeeeeee.'.      :___:
               .'.eeeeeeeeeeeeeeeeeeeeee.'.
              :____________________________:`
    }
  },
  methods: {
    editorInit () {
      require('brace/ext/searchbox')
      require('brace/ext/language_tools')
      require('brace/mode/javascript')
      require('brace/theme/monokai')
    }
  }
} */
</script>
