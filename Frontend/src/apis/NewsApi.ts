import { publicRequest } from '@src/hooks/requestMethod'
import { Search } from '@src/types/NewsType'

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

export const fetchSearch = async (data: Search) => {
  return await publicRequest.post('news/search/word', data)
}

export const fetchHotSearch = async () => {
  return await publicRequest.get('news/hot/word')
}
