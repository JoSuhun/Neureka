import { useState, useEffect } from 'react'
import * as s from '@src/components/styles/Stocks/StockChartSectionStyle'

const StockChartSection = () => {
  // 실시간 시세 api로 변경!
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let won = 74000
    setPrice(won)
  }, [])

  return (
    <>
      <s.Info>
        <s.InfoTable border={1}>
          <s.TableTr>
            <s.TableTd rowSpan={2}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <s.Price>{price.toLocaleString('ko-KR')}</s.Price>
                전일대비 어쩌구 저쩌구 얼씨구
              </div>
            </s.TableTd>
            <s.TableTd>전일 ㅇㅇㄴ</s.TableTd>
            <s.TableTd>고가 ㄴㄴㄴ</s.TableTd>
            <s.TableTd>거래량 ㄴㄴㄴ</s.TableTd>
          </s.TableTr>
          <s.TableTr>
            <s.TableTd>시가</s.TableTd>
            <s.TableTd>저가</s.TableTd>
            <s.TableTd>거래대금</s.TableTd>
          </s.TableTr>
        </s.InfoTable>
      </s.Info>

      <s.Graph>그ㅡㅡㅡㅡㅡ래ㅐㅐㅐㅐㅐ프ㅡㅡㅡㅡㅡ랍니다</s.Graph>
    </>
  )
}

export default StockChartSection
