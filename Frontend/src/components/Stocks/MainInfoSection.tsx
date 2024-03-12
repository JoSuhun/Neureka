import StockNewsSection from '@src/components/Stocks/StockNewsSection'
import StockChartSection from '@src/components/Stocks/StockChartSection'
import CorpInfoSection from '@src/components/Stocks/CorpInfoSection'
import * as s from '@src/components/styles/Stocks/MainInfoSectionStyle'

const MainInfoSection = () => {
  return (
    <s.Container>
      <s.TopContainer>
        <s.Title>삼성전자</s.Title>
        <s.CodeNumber>(005930)</s.CodeNumber>
      </s.TopContainer>
      <s.InfoWrap>
        <StockNewsSection />
        <StockChartSection />
        <CorpInfoSection />
      </s.InfoWrap>
    </s.Container>
  )
}

export default MainInfoSection
