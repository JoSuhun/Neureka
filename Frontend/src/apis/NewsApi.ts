import { publicRequest } from '@src/hooks/requestMethod'
import { Search } from '@src/types/NewsType'

export const fetchNewsList = async () => {
  return await publicRequest.get('news')
}

export const fetchNewsDetail = async (newsId: string) => {
  return await publicRequest.get('news/newsdetail', {
    params: {
      newsId: newsId,
    },
  })
}

export const fetchHotNews = async () => {
  return await publicRequest.get('news/hot')
}

export const fetchSearch = async (data: Search) => {
  return await publicRequest.post('news/search/word', data)
}

export const fetchHotSearch = async () => {
  return await publicRequest.get('news/hot/word')
}

export const fetchOtherNews = async (newsId: string) => {
  return await publicRequest.post(
    'news/other/',
    {},
    {
      params: {
        newsId: newsId,
      },
    },
  )
}
