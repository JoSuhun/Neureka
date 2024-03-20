import { useEffect, useState } from 'react'
import * as s from '@src/components/styles/Stocks/StockNewsSectionStyle'

interface NewsType {
  title: string
  content: string
}

const StockNewsSection = () => {
  const [stockNewsList, setStockNewsList] = useState<NewsType[]>([])

  useEffect(() => {
    const dummyData: NewsType[] = [
      {
        title: `레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’`,
        content: `최근 시장에선 레고켐바이오가 글로벌 빅파마인
        브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
        돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
        1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
        규모의 기술이전 계약을 체결했던 빅파마다.`,
      },
      {
        title: `레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’`,
        content: `최근 시장에선 레고켐바이오가 글로벌 빅파마인
        브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
        돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
        1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
        규모의 기술이전 계약을 체결했던 빅파마다.`,
      },
      {
        title: `레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’`,
        content: `최근 시장에선 레고켐바이오가 글로벌 빅파마인
        브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
        돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
        1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
        규모의 기술이전 계약을 체결했던 빅파마다.`,
      },
      {
        title: `레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’`,
        content: `최근 시장에선 레고켐바이오가 글로벌 빅파마인
        브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
        돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
        1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
        규모의 기술이전 계약을 체결했던 빅파마다.`,
      },
      {
        title: `레고켐바이오, 기업가치 저평가?…해외 ADC 업체들 주가 ‘날개’`,
        content: `최근 시장에선 레고켐바이오가 글로벌 빅파마인
        브리스톨마이어스스큅(BMS)과 기술이전 계약이 임박했다는 소문이
        돌았다. BMS는 지난해 12월 중국 ADC업체 시스트이뮨(SystImmune)과 임상
        1상 단계에 있는 이중항체 ADC ‘BL01D1’를 최대 84억달러(약 11조원)
        규모의 기술이전 계약을 체결했던 빅파마다.`,
      },
    ]

    setStockNewsList(dummyData)
  }, [])

  return (
    <s.Container>
      <s.Title>최근 뉴스</s.Title>
      <s.Wrap>
        {stockNewsList &&
          stockNewsList.map((news, index) => (
            <s.Item key={index}>
              <s.ItemBox>
                <s.ItemTitle>{news.title}</s.ItemTitle>
                <s.ItemContent>{news.content}</s.ItemContent>
              </s.ItemBox>
              <s.ItemImage src="/image/bg-image.jpg" alt="Background Image" />
            </s.Item>
          ))}
      </s.Wrap>
    </s.Container>
  )
}

export default StockNewsSection
