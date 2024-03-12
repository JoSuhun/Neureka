import React, { useCallback, useEffect, useState } from 'react'

import * as m from '@src/components/styles/Main/MainCardStyle'

import wrapperbgimage from '/image/bg-image.jpg'

import newspaperbgimage from '/image/bg-image-newspaper.jpg'

type Props = {}

const MainCard = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  }

  const [hover, setHover] = useState(false)

  const onMouseEnter = () => {
    setHover(true)
  }

  const onMouseLeave = () => {
    setHover(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
  })

  return (
    <>
      <m.Wrapper
        bgimage={
          hover && scrollPosition >= 100 ? newspaperbgimage : wrapperbgimage
        }
      >
        <m.MainTitle>
          NEWS HUB
          <m.MainTitle1
            className={scrollPosition < 100 ? `original` : `changed`}
          >
            .
          </m.MainTitle1>
        </m.MainTitle>
        <m.Box>
          <m.BoxTitle
            className={scrollPosition < 100 ? `original` : `changed`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            맞춤 뉴스를 주찬이에게 추천해
          </m.BoxTitle>
        </m.Box>
        <m.Box>
          <m.BoxTitle
            className={scrollPosition < 100 ? `original` : `changed`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            기업 정보를 승현이에게 알려줘 - ㅋㅋ
          </m.BoxTitle>
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MainCard
