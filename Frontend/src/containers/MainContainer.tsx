import { useEffect, useState } from 'react'
import SlideBar from '../components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'

type Props = {}

const MainContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <SlideBar />
      <MainCard />
      <div style={{ height: '30vh', backgroundColor: 'black' }}>z</div>
    </>
  )
}

export default MainContainer
