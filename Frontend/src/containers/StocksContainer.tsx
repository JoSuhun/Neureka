import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useQuery } from 'react-query'
import { fetchCompanyList, fetchCompanyPrice } from '@src/apis/StockApi'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
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
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  // 기업 전체 조회
  const { data: companyList } = useQuery({
    queryKey: ['CompanyList'],
    queryFn: fetchCompanyList,
  })

  // 선택 기업 차트 데이터 조회
  const { data: companyPriceList, refetch: refetchCompanyPriceList } = useQuery(
    {
      queryKey: ['CompanyPriceList'],
      queryFn: () => fetchCompanyPrice(selectedStock.code),
    },
  )

  useEffect(() => {
    refetchCompanyPriceList()
  }, [selectedStock, refetchCompanyPriceList])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <s.Container>
      <s.SidebarWrap>
        {companyList ? (
          <SearchStocksSection data={companyList} />
        ) : (
          <div>Loading!</div>
        )}
        <MyStocksSection />
        <LatestStocksSection />
      </s.SidebarWrap>
      <s.MainWrap>
        <MainTopSection />
        <StockNewsSection />
        <StockPriceSection />
        {companyPriceList ? (
          <StockChartSection initialData={companyPriceList} />
        ) : (
          <div>Loading!</div>
        )}
        <CorpInfoSection />
      </s.MainWrap>
    </s.Container>
  )
}

export default StocksContainer
