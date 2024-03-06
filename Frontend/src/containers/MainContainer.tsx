import { useState } from 'react'
import Navbar from '../common/Navbar'
import Carousel from '../components/News/Carousel'
import SlideBar from '../components/Main/SlideBar'
// import AuthModal from '../components/Auth/AuthModal'
import AuthModal from '@src/components/Auth/AuthModal'

type Props = {}

const MainContainer = (props: Props) => {
  return (
    <>
      <SlideBar />
    </>
  )
}

export default MainContainer