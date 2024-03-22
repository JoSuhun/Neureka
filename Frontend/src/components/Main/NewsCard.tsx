import React from 'react'

import image from '/image/thumbnail-sample3.png'
import * as n from '@src/components/styles/Main/NewsCard'
import { KeywordArticles } from '@src/types/MainType'

type Props = {
  article: KeywordArticles
  className: string
}

const NewsCard = (props: Props) => {
  return (
    <>
      <n.NewCardBox className={`card-box ${props.className}`.trim()}>
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail image={props.article.thumbnail_url} />
        </n.NewsThumbnailBox>
        <n.News>
          <n.NewsTitle className="card-title">
            {props.article.article_title}
          </n.NewsTitle>
          <n.NewsContent className="card-content">
            {props.article.article_summary}
          </n.NewsContent>
        </n.News>
      </n.NewCardBox>
    </>
  )
}

export default NewsCard
