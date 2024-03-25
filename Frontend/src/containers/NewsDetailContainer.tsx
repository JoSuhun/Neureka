import React, { useEffect } from 'react'
import * as n from '@src/containers/styles/NewsDetailContainerStyle'

import bgimage from '/image/bg-image-newsDetail.jpg'
import ArticleContent from '@src/components/NewsDetail/ArticleContent'
import ArticleGrade from '@src/components/NewsDetail/ArticleGrade'
import SimilarArticle from '@src/components/NewsDetail/SimilarArticle'
import BackBtn from '@src/components/NewsDetail/BackBtn'
import { useQuery } from 'react-query'
import { fetchNewsDetail } from '@src/apis/NewsApi'

type Props = {
  newsUrl: string
}

const NewsDetailContainer = ({ newsUrl }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
    refetch,
  } = useQuery({
    queryKey: 'get-news-detail',
    // queryFn: () => fetchNewsDetail(newsUrl),  // mongoDB 업데이트 필요함
    queryFn: () =>
      fetchNewsDetail('https://n.news.naver.com/mnews/article/011/0004316543'), // 일단은 mongoDB 더미데이터 사용 ..
  })

  if (isNewsListLoading) {
    return <>뉴스 불러오는 중 . . .</>
  }

  return (
    <>
      <n.HeaderImage bgimage={bgimage} />
      <n.Container>
        <ArticleContent newsData={newsData?.data} />
        <ArticleGrade />
        <SimilarArticle />
        <BackBtn />
      </n.Container>
    </>
  )
}

export default NewsDetailContainer
