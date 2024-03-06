import { useState } from 'react'
import Navbar from '../common/Navbar'
import Carousel from '../components/Main/Carousel'
import SlideBar from '../components/Main/SlideBar'
import AuthModal from '@src/components/Auth/AuthModal'

type Props = {}

const MainContainer = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleModal = () => {
    setModalOpen(!modalOpen)
  }
  return (
    <>
      <Navbar modalOpen={modalOpen} handleModal={handleModal} />
      <SlideBar />
      <Carousel />
      <AuthModal modalOpen={modalOpen} handleModal={handleModal} />
    </>
  )
}

export default MainContainer
