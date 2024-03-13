import React, { useCallback, useEffect, useState } from 'react'
import * as m from '@src/components/styles/Main/MainCardStyle'
import wrapperbgimage from '/image/bg-image4.jpg'
import wrapperbgimage2 from '/image/bg-image-newspaper.jpg'
import wrapperbgimage3 from '/image/bg-image-newsDetail.jpg'

type Props = {}

const MainCard = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hover, setHover] = useState(false)
  const [hover2, setHover2] = useState(false)

  const updateScroll = useCallback(() => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  }, [])

  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  const onMouseEnter2 = useCallback(() => {
    setHover2(true)
  }, [])

  const onMouseLeave2 = useCallback(() => {
    setHover2(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [updateScroll])

  // background image 미리 로드
  useEffect(() => {
    const images = [wrapperbgimage, wrapperbgimage2, wrapperbgimage3]
    images.forEach(image => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    <>
      <m.Wrapper
        bgimage={
          hover && scrollPosition >= 100
            ? wrapperbgimage2
            : hover2 && scrollPosition >= 100
              ? wrapperbgimage3
              : wrapperbgimage
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
            onMouseEnter={onMouseEnter2}
            onMouseLeave={onMouseLeave2}
          >
            기업 정보를 승현이에게 알려줘 - ㅋㅋ
          </m.BoxTitle>
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MainCard
