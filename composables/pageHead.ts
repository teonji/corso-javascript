interface pageHead {
  title?: string
  description?: string
  image?: string
  robots?: string
}
export const usePageHead = async (data?: pageHead) => {

  const teonji = await queryContent('/teonji').findOne()

  const title =  data?.title ? `${data?.title} - ${teonji?.name}` : `${teonji?.name} - ${teonji?.roles[0]}`
  const description = data?.description ?? teonji?.bio
  const image = data?.image ?? '/teonji.png'
  const robots = data?.robots ?? 'index,follow'
  const type = 'website'

  return {
    title,
    description,
    meta: [
      { hid: 'title', name: 'title', content: title },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', property: 'og:description', description },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'robots', name: 'robots', content: robots },
      { hid: 'og:type', property: 'og:type', content: type },
    ],
  }
}
