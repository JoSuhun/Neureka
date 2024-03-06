import SearchStocksSection from '@src/components/Stocks/SearchStocksSection'
import FavoriteStocksSection from '@src/components/Stocks/FavoriteStocksSection'
import * as s from '@src/components/styles/Stocks/SideBarSectionStyle'

const SideBarSection = () => {
  return (
    <s.Container>
      <SearchStocksSection />
      <FavoriteStocksSection />
    </s.Container>
  )
}

export default SideBarSection
