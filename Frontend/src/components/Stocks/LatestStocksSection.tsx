import { CompanyLatestType } from '@src/types/CompanyType'
import * as l from '@src/components/styles/Stocks/LatestStocksSectionStyle'

const LatestStocksSection = (props: { data: CompanyLatestType[] }) => {
  const { data } = props

  return (
    <l.Container>
      <l.Title>최근 조회</l.Title>
      <l.Wrap>
        {data && data.length > 0 ? (
          data.map(item => (
            <l.Item key={item.crId}>({item.companyCode})</l.Item>
          ))
        ) : (
          <l.NoneItem>최근 조회한 기업이 없습니다.</l.NoneItem>
        )}
      </l.Wrap>
    </l.Container>
  )
}

export default LatestStocksSection
