import React from 'react'

import * as c from '../styles/News/CustomizedNewsStyle'

import image from '/image/thumbnail-sample.gif'
import { RecommendNews } from '@src/types/NewsType'
import { useNavigate } from 'react-router-dom'

type Props = {
  news: RecommendNews
}

const CustomizedNewsItem = ({ news }: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <c.NewsList onClick={() => navigate(`news/newsdetail/${news._id}`)}>
        <c.NewsThumbnail image={news.thumbnail_url} />
        <c.NewsSection>
          <c.NewsTitle className="news-title">{news.article_title}</c.NewsTitle>
          <c.NewsContent className="news-content">
            {news.article_summary}
          </c.NewsContent>
        </c.NewsSection>
      </c.NewsList>
    </>
  )
}

export default CustomizedNewsItem
