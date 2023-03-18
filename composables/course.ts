import { ref } from 'vue'
// @ts-ignore
import md5 from 'md5'
import useApi from '~/composables/api'
export async function useCourse () {
  const chapters = await useApi.getChapters()
  const learnt = ref<any>([])
  const isLearnt = (path: string) => {
    return learnt.value.includes(md5(path))
  }
  const isChapterEnabled = (step: any) => {
    const index = chapters.findIndex(s => s.path === step.path)
    return index === 0 || isLearnt(chapters[index - 1].path)
  }

  const putLearntCode = (list: any) => {
    return list.map((l: any) => {
      l.learntCode = md5(l.path)
      l.learnt = learnt.value.includes(l.learntCode)
      return l
    })
  }

  const checkChapters = (params = {}, steps = []) => {
    const chaptersToCheck = putLearntCode(chapters)
    const stepsToCheck = putLearntCode(steps)
    const checkChapterIndex = chaptersToCheck.findIndex(c => c.path === `/${params.chapter}`)
    let lastChapterIndexLearnt = chaptersToCheck.findLastIndex(c => c.learnt)
    lastChapterIndexLearnt += 1
    if (checkChapterIndex > lastChapterIndexLearnt) {
      return `/corso${chaptersToCheck[lastChapterIndexLearnt].path}`
    } else if (checkChapterIndex === lastChapterIndexLearnt) {
      const checkStepIndex = stepsToCheck.findIndex(s => s.path === `/${params.chapter}/${params.step}`)
      const lastStepIndexLearnt = stepsToCheck.findLastIndex(c => c.learnt)
      if (checkStepIndex > lastStepIndexLearnt + 1) {
        return `/corso${stepsToCheck[lastStepIndexLearnt + 1].path}`
      }
    }
  }

  const findStepIndex = (steps, step) => {
    return steps.findIndex(s => s.path === step.path)
  }

  const isStepEnabled = (steps, step: any) => {
    const index = findStepIndex(steps, step)
    return index === 0 || isLearnt(steps[index - 1].path)
  }

  return {
    chapters,
    learnt,
    isLearnt,
    isChapterEnabled,
    findStepIndex,
    isStepEnabled,
    checkChapters,
  }
}
