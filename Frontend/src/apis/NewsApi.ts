import { publicRequest } from '@src/hooks/requestMethod'

export const fetchNewsList = async () => {
  return await publicRequest.get('news')
}

export const fetchNewsDetail = async (url: string) => {
  return await publicRequest.get('news/newsdetail', {
    params: {
      newsId: url,
    },
  })
}

export const fetchHotNews = async () => {
  return await publicRequest.get('news/hot')
}
