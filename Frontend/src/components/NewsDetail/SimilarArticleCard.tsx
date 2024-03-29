import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/NewsDetail/SimilarArticleCardStyle'

import defaultThumbnail from '/image/ky.gif'
import { useQuery } from 'react-query'
import { fetchNewsDetail } from '@src/apis/NewsApi'

type Props = {
  news: string
}

const SimilarArticleCard = ({ news }: Props) => {
  const [newsTitle, setNewsTitle] = useState('')

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
    refetch,
  } = useQuery({
    queryKey: ['news-detail', news],
    queryFn: () => fetchNewsDetail(news),
    onSuccess: res => {
      console.log(res.data)
      setNewsTitle(res.data.detail_title)
    },
  })

  if (isNewsListLoading) {
    return <>로딩중 . . .</>
  }

  return (
    <>
      <c.Wrapper className="card">
        <c.Thumbnail className="card-thumbnail" />
        <c.Title className="card-title">{newsTitle}</c.Title>
        <c.Content className="card-content">ss</c.Content>
      </c.Wrapper>
    </>
  )
}

export default SimilarArticleCard
