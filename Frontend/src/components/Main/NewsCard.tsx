import React from 'react'

import * as n from '@src/components/styles/Main/NewsCard'
import { KeywordNews } from '@src/types/MainType'

type Props = {
  article: KeywordNews
  className: string
}

const NewsCard = ({ article, className }: Props) => {
  return (
    <>
      <n.NewCardBox className={`card-box ${className}`.trim()}>
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail image={article.thumbnail_url} />
        </n.NewsThumbnailBox>
        <n.News>
          <n.NewsTitle className="card-title">
            {article.article_title}
          </n.NewsTitle>
          <n.NewsContent className="card-content">
            {article.article_summary}
          </n.NewsContent>
        </n.News>
      </n.NewCardBox>
    </>
  )
}

export default NewsCard
