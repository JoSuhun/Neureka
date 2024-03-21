import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchCompanyList } from '@src/apis/StockApi'
import SearchStocksSection from '@src/components/Stocks/SearchStocksSection'
import MyStocksSection from '@src/components/Stocks/MyStocksSection'
import LatestStocksSection from '@src/components/Stocks/LatestStocksSection'
import MainTopSection from '@src/components/Stocks/MainTopSection'
import StockNewsSection from '@src/components/Stocks/StockNewsSection'
import StockPriceSection from '@src/components/Stocks/StockPriceSection'
import StockChartSection from '@src/components/Stocks/StockChartSection'
import CorpInfoSection from '@src/components/Stocks/CorpInfoSection'
import * as s from '@src/containers/styles/StocksContainerStyle'

const StocksContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { data } = useQuery({
    queryKey: ['GetCompanyList'],
    queryFn: fetchCompanyList,
  })

  return (
    <s.Container>
      <s.SidebarWrap>
        {data ? <SearchStocksSection data={data} /> : <div>Loading!</div>}
        <MyStocksSection />
        <LatestStocksSection />
      </s.SidebarWrap>
      <s.MainWrap>
        <MainTopSection />
        <StockNewsSection />
        <StockPriceSection />
        <StockChartSection />
        <CorpInfoSection />
      </s.MainWrap>
    </s.Container>
  )
}

export default StocksContainer
