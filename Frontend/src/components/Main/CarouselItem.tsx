import React, { useEffect, useState } from 'react'

import * as c from '../styles/Main/CarouselStyle'

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
          <c.CardTitle1>KEYWORDS</c.CardTitle1>
          <c.CardContent1>키워드로 추천받는 오늘의 뉴스</c.CardContent1>
        </c.CarouselCard>
      ) : type === '2' ? (
        <c.CarouselCard bgimage={bgimage2}>
          <c.CardTitle2>MY STOCK</c.CardTitle2>
          <c.CardContent2>
            관심 종목의 실시간 뉴스와 시세를 한눈에 확인하세요
          </c.CardContent2>
        </c.CarouselCard>
      ) : (
        <c.CarouselCard bgimage={bgimage3}>
          <c.CardTitle3>NEWS HUB</c.CardTitle3>
          <c.CardContent3>최신 뉴스와 인기 뉴스를 확인해보세요</c.CardContent3>
        </c.CarouselCard>
      )}
    </>
  )
}

export default CarouselItem
