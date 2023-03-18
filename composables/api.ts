// @ts-ignore
import md5 from 'md5'

const getLearnt = () => {
  const learnt = localStorage.getItem('learnjs_learnt')
  if (learnt) {
    return JSON.parse(learnt)
  } else {
    return []
  }
}
const setLearnt = (learnt: any) => {
  localStorage.setItem('learnjs_learnt', JSON.stringify(learnt))
}
const getTest = (path: string) => {
  try {
    return localStorage.getItem(`learnjs_learnt_${path}`) || null
  } catch (e) {
    return null
  }
}
const setTest = (data: any) => {
  localStorage.setItem(`learnjs_learnt_${data.path}`, data.content)
}
const getChapters = async () => {
  const data = await queryContent('/').find()
  return data
    .filter(f =>  f?._path?.split('/').length === 2)
    .map(f => ({
      title: f.title,
      description: f.description,
      slug: `/corso${f._path}`, // TODO
      path: f._path,
    }))
}
const getSteps = async (chapter: string) => {
  const data = await queryContent(`/${chapter}`).find()
  return data
    .filter(f =>  f?._path?.split('/').length === 3)
    .map(s => ({
    title: s.title,
    description: s.description,
    slug: `/corso${s._path}`,
    path: s._path,
    test: !!s.test,
  }))
}
const getChapter = async (chapter: string) => {
  const data = await getChapters()
  return data.find(c => c.path === `/${chapter}`)
}

const getStep = async ({ chapter, step }) => {
  const data = await queryContent(`/${chapter}/${step}`).findOne()
  return {
    ...data,
    title: data.title,
    description: data.description,
    slug: `/corso${data._path}`,
    path: data._path,
  }
}
export default ({
  getLearnt,
  setLearnt,
  getTest,
  setTest,
  getChapters,
  getSteps,
  getChapter,
  getStep,
})
