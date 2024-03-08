import React, { useEffect, useState } from 'react'

import * as c from '../styles/News/CarouselStyle'

import bgimage from '/image/bg-image.jpg'
import bgimage2 from '/image/bg-image2.jpg'
import bgimage3 from '/image/bg-image3.jpg'

type Props = {
  type: string
}

const CarouselItem = ({ type }: Props) => {
  return (
    <>
      {type === '1' ? (
        <c.CarouselCard bgimage={bgimage}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      ) : type === '2' ? (
        <c.CarouselCard bgimage={bgimage2}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      ) : (
        <c.CarouselCard bgimage={bgimage3}>
          <c.HeadLine>헤드라인 어쩌구 저쩌구 중요한 내용</c.HeadLine>
        </c.CarouselCard>
      )}
    </>
  )
}

export default CarouselItem
