import { useEffect, useState } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import * as m from '@src/containers/styles/MainContainer'
import KeywordNews from '@src/components/Main/KeywordNews'
import BubbleCategory from '@src/components/Main/BubbleCategory'
import BubbleChart from '@src/components/Main/BubbleChart'

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

        <m.BubbleCategoryWrapper>
          <BubbleCategory />
        </m.BubbleCategoryWrapper>

        <m.BubbleChartWrapper>
          <BubbleChart />
        </m.BubbleChartWrapper>

        <m.NewsWrapper>
          <KeywordNews />
        </m.NewsWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
