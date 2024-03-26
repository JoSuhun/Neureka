import { CompanyPriceType } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/StockPriceSectionStyle'

const StockPriceSection = (props: { data: CompanyPriceType[] }) => {
  const { data } = props
  const lastItem = data[data.length - 1]
  const changePercentage = ((lastItem?.change || 0) * 100).toFixed(2)
  const isPositiveChange = lastItem.close - data[data.length - 2].close > 0

  return (
    <s.Container>
      <s.Title>오늘의 시세</s.Title>
      <s.InfoWrap>
        <s.LeftWrap>
          <s.LeftTopWrap isPositiveChange={isPositiveChange}>
            {lastItem.close}
          </s.LeftTopWrap>
          <s.LeftBottomWrap>
            <s.LeftBottomTitle>전일대비</s.LeftBottomTitle>
            <s.LeftBottomNumber isPositiveChange={isPositiveChange}>
              {lastItem.close - data[data.length - 2].close}
            </s.LeftBottomNumber>
            <s.LeftBottomNumber isPositiveChange={isPositiveChange}>
              {changePercentage}%
            </s.LeftBottomNumber>
          </s.LeftBottomWrap>
        </s.LeftWrap>
        <s.RightWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.RightItemTitle>전일</s.RightItemTitle>
              <s.RightItemNumber>
                {data[data.length - 2].close}
              </s.RightItemNumber>
            </s.RightItem>
            <s.RightItem>
              <s.RightItemTitle>시가</s.RightItemTitle>
              <s.RightItemColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.open}
              </s.RightItemColorNumber>
            </s.RightItem>
          </s.RightInnerWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.RightItemTitle>고가</s.RightItemTitle>
              <s.RightItemColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.high}
              </s.RightItemColorNumber>
            </s.RightItem>
            <s.RightItem>
              <s.RightItemTitle>저가</s.RightItemTitle>
              <s.RightItemColorNumber isPositiveChange={isPositiveChange}>
                {lastItem.low}
              </s.RightItemColorNumber>
            </s.RightItem>
          </s.RightInnerWrap>
          <s.RightInnerWrap>
            <s.RightItem>
              <s.RightItemTitle>거래량</s.RightItemTitle>
              <s.RightItemNumber>{lastItem.volume}</s.RightItemNumber>
            </s.RightItem>
            <s.RightItem>
              <s.RightItemTitle>거래대금</s.RightItemTitle>
              <s.RightItemNumber>
                {lastItem.volume * lastItem.close}
              </s.RightItemNumber>
            </s.RightItem>
          </s.RightInnerWrap>
        </s.RightWrap>
      </s.InfoWrap>
    </s.Container>
  )
}

export default StockPriceSection
