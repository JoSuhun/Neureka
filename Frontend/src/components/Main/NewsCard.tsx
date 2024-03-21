import React from 'react'

import image from '/image/thumbnail-sample3.png'
import * as n from '@src/components/styles/Main/NewsCard'

type Props = { className: string }

const NewsCard = (props: Props) => {
  return (
    <>
      <n.NewCardBox className={`card-box ${props.className}`.trim()}>
        <n.NewsThumbnailBox className="card-thumbnail">
          <n.NewsThumbnail image={image} />
        </n.NewsThumbnailBox>
        <n.News>
          <n.NewsTitle className="card-title">
            레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’
          </n.NewsTitle>
          <n.NewsContent className="card-content">
            최근 시장에선 레고켐바이오가 글로벌 빅파마인
            브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
            돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
            1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
            규모의 기술이전 계약을 체결했던 빅파마다. 해당 계약은
            선급금(upfront)만 8억달러(약 1조676억원)에 근시일내 지급할 단기
            마일스톤 5억달러(약 6565억원)라는 파격적인 조건으로 주목 받기도
            했다.
          </n.NewsContent>
        </n.News>
      </n.NewCardBox>
    </>
  )
}

export default NewsCard
