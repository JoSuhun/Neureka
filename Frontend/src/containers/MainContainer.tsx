import { useState } from 'react'
import Navbar from '../common/Navbar'
import Carousel from '../components/News/Carousel'
import SlideBar from '../components/Main/SlideBar'
// import AuthModal from '../components/Auth/AuthModal'
import AuthModal from '@src/components/Auth/AuthModal'
import MainCard from '@src/components/Main/MainCard'

type Props = {}

const MainContainer = (props: Props) => {
  return (
    <>
      <SlideBar />
      <MainCard />
      <div style={{ height: '30vh', backgroundColor: 'black' }}>z</div>
    </>
  )
}

export default MainContainer
