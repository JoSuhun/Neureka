import SideBarSection from '@src/components/Stocks/SideBarSection'
import MainInfoSection from '@src/components/Stocks/MainInfoSection'
import * as s from '@src/containers/styles/StocksContainerStyle'

const StocksContainer = () => {
  return (
    <s.Container>
      <SideBarSection />
      <MainInfoSection />
    </s.Container>
  )
}

export default StocksContainer
