import { useEffect, useState } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import BubbleNews from '@src/components/Main/BubbleNews'

type Props = {}

const MainContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <SlideBar />
      <MainCard />
      <div style={{height: "50px"}}></div>
      <BubbleNews />
      <div style={{ height: '30vh', backgroundColor: 'black' }}>z</div>
    </>
  )
}

export default MainContainer
