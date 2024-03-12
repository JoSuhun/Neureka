import React, { useEffect, useState } from 'react'

import * as s from '@src/components/styles/NewsDetail/SimilarArticleStyle'
import SimilarArticleCard from './SimilarArticleCard'

import sampleimage from '/image/satoru.gif'

type Props = {}

const SimilarArticle = (props: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    setTitle(
      '[승현아] 어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
    )
    setContent(
      '주찬이가어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구',
    )
  })
  return (
    <>
      <s.Wrapper>
        <s.Title>방금 보신 기사와 비슷해요 !</s.Title>
        <s.ArticleBox>
          <SimilarArticleCard
            image={sampleimage}
            title={title}
            content={content}
          />
          <SimilarArticleCard
            image={sampleimage}
            title={title}
            content={content}
          />
          <SimilarArticleCard
            image={sampleimage}
            title={title}
            content={content}
          />
        </s.ArticleBox>
      </s.Wrapper>
    </>
  )
}

export default SimilarArticle
