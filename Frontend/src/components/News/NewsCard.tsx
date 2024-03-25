import React from 'react'
import { useNavigate } from 'react-router-dom'

import * as n from '../styles/News/NewsListStyle'
import image from '/image/thumbnail-sample3.png'
import { NewsSummary } from '@src/types/NewsType'

type Props = {
  news: NewsSummary
}

const NewsCard = ({ news }: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <n.NewCardBox
        className="card-box"
        onClick={() =>
          navigate(`/news/detail/${encodeURIComponent(news.article_link)}`)
        }
      >
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail image={news.thumbnail_url} />
        </n.NewsThumbnailBox>
        <n.News>
          <n.NewsTitle className="card-title">{news.article_title}</n.NewsTitle>
          <n.NewsContent className="card-content">
            {news.article_summary}
          </n.NewsContent>
        </n.News>
      </n.NewCardBox>
    </>
  )
}

export default NewsCard
