import React, { useEffect, useState } from 'react'

import * as c from '../styles/News/CarouselStyle'

import bgimage from '/image/bg-image.jpg'
import bgimage2 from '/image/bg-image2.jpg'
import bgimage3 from '/image/bg-image3.jpg'
import { useNavigate } from 'react-router-dom'
import { HotNews } from '@src/types/NewsType'

type Props = {
  news: HotNews
}

const CarouselItem = ({ news }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <c.CarouselCard
        className="carousel-item"
        bgimage={news.headline_thumbnail_url}
        onClick={() =>
          navigate(`/news/${encodeURIComponent(news.headline_url)}`)
        }
      >
        <c.HeadLine>{news.headline_title}</c.HeadLine>
        <c.Info>
          <c.Date>{news.headline_date}</c.Date>
          <c.Press>{news.headline_press}</c.Press>
        </c.Info>
      </c.CarouselCard>
    </>
  )
}

export default CarouselItem
