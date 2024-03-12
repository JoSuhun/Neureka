import React, { useEffect, useState } from 'react'

import * as m from '@src/components/styles/Main/MainCardStyle'

import HdrWeakIcon from '@mui/icons-material/HdrWeak'

import wrapperbgimage from '/image/bg-image.jpg'

type Props = {}

const MainCard = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
  })

  return (
    <>
      <m.Wrapper bgimage={wrapperbgimage}>
        <m.MainTitle>
          NEWS HUB
          <m.MainTitle1
            className={scrollPosition < 100 ? `original` : `changed`}
          >
            <HdrWeakIcon />
          </m.MainTitle1>
        </m.MainTitle>
        <m.Box>
          <m.BoxTitle className={scrollPosition < 100 ? `original` : `changed`}>
            맞춤 뉴스를 찾아 보세요
          </m.BoxTitle>
        </m.Box>
        <m.Box>
          <m.BoxTitle className={scrollPosition < 170 ? `original` : `changed`}>
            기업 정보를 승현이에게 - ㅋㅋ
          </m.BoxTitle>
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MainCard
