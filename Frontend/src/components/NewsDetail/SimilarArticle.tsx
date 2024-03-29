import React, { useEffect, useState } from 'react'

import * as s from '@src/components/styles/NewsDetail/SimilarArticleStyle'
import SimilarArticleCard from './SimilarArticleCard'

import sampleimage from '/image/satoru.gif'
import { useMutation } from 'react-query'
import { fetchOtherNews } from '@src/apis/NewsApi'

type Props = {
  newsId: string
}

const SimilarArticle = ({ newsId }: Props) => {
  const [otherNews, setOtherNews] = useState<string[] | null>(null)

  const { mutate: otherNewsMutate } = useMutation(
    (newsId: string) => fetchOtherNews(newsId),
    {
      onSuccess: res => {
        // console.log('비슷한 기사 가져오기 성공' + res.data)
        setOtherNews(res.data)
      },
    },
  )
  useEffect(() => {
    otherNewsMutate(newsId)
  }, [])

  return (
    <>
      <s.Wrapper>
        <s.Title className="title">방금 보신 기사와 비슷해요 !</s.Title>
        <s.ArticleBox className="card-box">
          {otherNews?.map((news, idx) => (
            <SimilarArticleCard news={news} key={idx} />
          ))}
        </s.ArticleBox>
      </s.Wrapper>
    </>
  )
}

export default SimilarArticle
