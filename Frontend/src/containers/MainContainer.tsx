import Navbar from '../common/Navbar'
import Carousel from '../components/Main/Carousel'
import SlideBar from '../components/Main/SlideBar'

type Props = {}

const MainContainer = (props: Props) => {
  return (
    <>
      <Navbar />
      <SlideBar />
      <Carousel />
    </>
  )
}

export default MainContainer
