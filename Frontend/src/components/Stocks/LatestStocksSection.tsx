import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { CompanyType, CompanyLatestType } from '@src/types/CompanyType'
import * as l from '@src/components/styles/Stocks/LatestStocksSectionStyle'

const LatestStocksSection = (props: { data: CompanyLatestType[] }) => {
  const { data } = props
  const [, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleClick = (item: CompanyType) => {
    setSelectedStock(item)
  }

  return (
    <l.Container className="latestStocks">
      <l.Title>최근 조회</l.Title>
      <l.Wrap>
        {data && data.length > 0 ? (
          data.map(item => (
            <l.Item key={item.crId} onClick={() => handleClick(item.company)}>
              {item.company.companyName} ({item.company.code})
            </l.Item>
          ))
        ) : (
          <l.NoneItem>최근 조회한 기업이 없습니다.</l.NoneItem>
        )}
      </l.Wrap>
    </l.Container>
  )
}

export default LatestStocksSection
