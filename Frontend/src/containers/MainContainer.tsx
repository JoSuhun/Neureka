import { useEffect, useState } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import BubbleNews from '@src/components/Main/BubbleNews'
import * as m from '@src/containers/styles/MainContainer'
import KeywordNews from '@src/components/Main/KeywordNews'

type Props = {}

const MainContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <m.container>
        <SlideBar />
        <MainCard />
        <div style={{ height: '50px' }}></div>
        <BubbleNews />
        <m.NewsWrapper>
          <KeywordNews />
        </m.NewsWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
