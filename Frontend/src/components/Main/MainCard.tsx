import React from 'react'
import * as m from '../styles/Main/MainCardStyle'

import wrapperbgimage from '/image/bg-image3.jpg'
import bgimage from '/image/maincard-image.jpg'

type Props = {}

const MainCard = (props: Props) => {
  return (
    <>
      <m.Wrapper bgimage={wrapperbgimage}>
        <m.Box>
          <m.BoxTitle>CUSTOMIZED NEWS</m.BoxTitle>
          <m.BoxContent className="content">
            맞춤 뉴스를 추천받아보세요
          </m.BoxContent>
        </m.Box>
        <m.Box>
          <m.BoxTitle>STOCK HUB</m.BoxTitle>
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MainCard
