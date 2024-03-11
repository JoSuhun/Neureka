import SideBarSection from '@src/components/Stocks/SideBarSection'
import MainInfoSection from '@src/components/Stocks/MainInfoSection'
import * as s from '@src/containers/styles/StocksContainerStyle'
import { useEffect } from 'react'

const StocksContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <s.Container>
      <SideBarSection />
      <MainInfoSection />
    </s.Container>
  )
}

export default StocksContainer
