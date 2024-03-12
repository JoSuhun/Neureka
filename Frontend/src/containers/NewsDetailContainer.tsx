import React, { useEffect } from 'react'
import * as n from '@src/containers/styles/NewsDetailContainerStyle'

import bgimage from '/image/thumbnail-sample.gif'
import ArticleContent from '@src/components/NewsDetail/ArticleContent'
import ArticleGrade from '@src/components/NewsDetail/ArticleGrade'
import SimilarArticle from '@src/components/NewsDetail/SimilarArticle'
import BackBtn from '@src/components/NewsDetail/BackBtn'

type Props = {}

const NewsDetailContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <n.HeaderImage bgimage={bgimage} />
      <n.Container>
        <ArticleContent />
        <ArticleGrade />
        <SimilarArticle />
        <BackBtn />
      </n.Container>
    </>
  )
}

export default NewsDetailContainer
