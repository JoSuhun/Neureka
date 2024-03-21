import React from 'react'

import * as c from '../styles/News/CustomizedNewsStyle'

import image from '/image/thumbnail-sample.gif'

type Props = {}

const CustomizedNewsItem = (props: Props) => {
  return (
    <>
      <c.NewsList>
        <c.NewsThumbnail image={image} />
        <c.NewsSection>
          <c.NewsTitle className="news-title">
            너와 행복했던 1155일의 기록…'푸'린세스 다이어리
          </c.NewsTitle>
          <c.NewsContent className="news-content">
            푸바오는 ‘행복을 주는 보물’이란 뜻이다. 2020년 7월 20일. 사랑(엄마
            아이바오)과 기쁨(아빠 러바오) 사이에서 태어난 자이언트 판다. 길이
            16.5㎝, 몸무게 197g으로 어른 손바닥에 올라갈 만큼 작은 몸으로 태어난
            이 곰 한 마리는 역사상 유례없는 ‘동물 신드롬’의 주인공이 됐다. 그
            작던 몸집이 100㎏에 달하며 무럭무럭 자라날수록 사람들의 행복도 함께
            커졌다. 이름 그대로 거대한 행복을 수많은 이에게 선물했다.
          </c.NewsContent>
        </c.NewsSection>
      </c.NewsList>
    </>
  )
}

export default CustomizedNewsItem
