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
          <c.CardTitle1>헤드라인 어쩌구 저쩌구 중요한 내용</c.CardTitle1>
          <c.CardContent1>ㄱㄴㄷㄹㅁㅂ</c.CardContent1>
        </c.CarouselCard>
      ) : type === '2' ? (
        <c.CarouselCard bgimage={bgimage2}>
          <c.CardTitle2>ㄱㄴㄷ</c.CardTitle2>
          <c.CardContent2>ㄱㄴㄷㄹㅁㅂ</c.CardContent2>
        </c.CarouselCard>
      ) : (
        <c.CarouselCard bgimage={bgimage3}>
          <c.CardTitle3>ㄱㄴㄷ</c.CardTitle3>
          <c.CardContent3>ㄱㄴㄷㄹㅁㅂ</c.CardContent3>
        </c.CarouselCard>
      )}
    </>
  )
}

export default CarouselItem
