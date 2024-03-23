import * as l from '@src/components/styles/Stocks/LatestStocksSectionStyle'

const LatestStocksSection = () => {
  const data: string[] = []

  return (
    <l.Container>
      <l.Title>최근 조회</l.Title>
      <l.Wrap>
        {data.length > 0 ? (
          <l.Item></l.Item>
        ) : (
          <l.NoneItem>최근 조회한 기업이 없습니다.</l.NoneItem>
        )}
      </l.Wrap>
    </l.Container>
  )
}

export default LatestStocksSection
