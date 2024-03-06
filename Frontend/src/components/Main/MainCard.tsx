import React from 'react'
import * as m from '../styles/Main/MainCardStyle'

import bgimage from '/image/maincard-image.jpg'

type Props = {}

const MainCard = (props: Props) => {
  return (
    <>
      <m.Wrapper>
        <m.Card bgimage={bgimage}></m.Card>
      </m.Wrapper>
    </>
  )
}

export default MainCard
