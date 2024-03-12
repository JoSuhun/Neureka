import React, { useEffect, useState } from 'react'

import * as c from '../styles/News/CarouselStyle'

import bgimage from '/image/bg-image.jpg'
import bgimage2 from '/image/bg-image2.jpg'
import bgimage3 from '/image/bg-image3.jpg'
import { useNavigate } from 'react-router-dom'

type Props = {
  type: string
}

const CarouselItem = ({ type }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      {type === '1' ? (
        <c.CarouselCard bgimage={bgimage} onClick={() => navigate('/news/1')}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      ) : type === '2' ? (
        <c.CarouselCard bgimage={bgimage2} onClick={() => navigate('/news/2')}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      ) : (
        <c.CarouselCard bgimage={bgimage3} onClick={() => navigate('/news/3')}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      )}
    </>
  )
}

export default CarouselItem
