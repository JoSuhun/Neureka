import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as m from '@src/components/styles/Main/MainCardStyle'
import wrapperbgimage from '/image/bg-image4.jpg'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type Props = {}

const MainCard = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const updateScroll = useCallback(() => {
    if (boxRef.current) {
      const scrollTop = boxRef.current.scrollTop
      setScrollPosition(scrollTop)
    }
    console.log(scrollPosition)
  }, [])

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener('scroll', updateScroll)
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener('scroll', updateScroll)
      }
    }
  }, [updateScroll])

  // const animateCursor = useCallback((e: any) => {
  //   if (cursorRef.current) {
  //     cursorRef.current.style.left = `${e.pageX}px`
  //     cursorRef.current.style.top = `${e.pageY}px`
  //   }
  // }, [])

  // useEffect(() => {
  //   window.addEventListener('mousemove', animateCursor)
  // }, [animateCursor])

  return (
    <>
      <m.Wrapper>
        <m.Box ref={boxRef} bgimage={wrapperbgimage}>
          <m.Cursor ref={cursorRef} />
          <m.Title className={scrollPosition > 30 ? `changed` : ''}>
            NEúrēka
          </m.Title>
          <m.Info className={scrollPosition > 30 ? `changed` : ``}>
            오늘의 뉴스
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
          <m.Info className={scrollPosition > 30 ? `changed` : ``}>
            관심 키워드 맞춤 뉴스 추천
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
          <m.Info className={scrollPosition > 30 ? `changed` : ``}>
            원하는 기업의 각종 정보를 모아서
            <span>
              <MoreHorizIcon />
            </span>
          </m.Info>
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MainCard
