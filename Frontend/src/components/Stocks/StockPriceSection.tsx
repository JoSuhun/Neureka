import { useState, useEffect } from 'react'
import * as s from '@src/components/styles/Stocks/StockPriceSectionStyle'

const StockPriceSection = () => {
  // 실시간 시세 api로 변경!
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let won = 74000
    setPrice(won)
  }, [])

  return (
    <s.Container>
      <s.Title>오늘의 시세</s.Title>
      <s.InfoWrap>
        <s.LeftWrap>
          <s.LeftTopWrap>74,100</s.LeftTopWrap>
          <s.LeftBottomWrap>전일대비 : ?</s.LeftBottomWrap>
        </s.LeftWrap>
        <s.Divider />
        <s.RightWrap>
          <s.RightTopWrap>
            <div>전일 74,900</div>
            <div>고가 74,800</div>
            <div>거래량 13,011,138</div>
          </s.RightTopWrap>
          <s.RightBottomWrap>
            <div>시가 74,600</div>
            <div>저가 73,900</div>
            <div>거래대금 966,088 백만</div>
          </s.RightBottomWrap>
        </s.RightWrap>
      </s.InfoWrap>
    </s.Container>
  )
}

export default StockPriceSection
