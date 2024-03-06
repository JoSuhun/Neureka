import SlideBar from '../components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'

type Props = {}

const MainContainer = (props: Props) => {
  return (
    <>
      <SlideBar />
      <MainCard />
      <MainCard />
    </>
  )
}

export default MainContainer
