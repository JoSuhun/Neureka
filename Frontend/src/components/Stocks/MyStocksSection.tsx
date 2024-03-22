import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { CompanyType, CompanyLikeType } from '@src/types/CompanyType'
import * as m from '@src/components/styles/Stocks/MyStocksSectionStyle'

const MyStocksSection = (props: { data: CompanyLikeType[] }) => {
  const { data } = props
  const [selectedStock, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleClick = (item: CompanyType) => {
    setSelectedStock(item)
  }

  return (
    <m.Container>
      <m.Title>MY STOCK</m.Title>
      {data ? (
        <m.Wrap>
          {data.map(item => (
            <m.Item
              key={item.company.companyId}
              onClick={() => handleClick(item.company)}
            >
              {item.company.companyName} ({item.company.code})
            </m.Item>
          ))}
        </m.Wrap>
      ) : (
        <m.NoneItem>관심 기업을 등록하세요!</m.NoneItem>
      )}
    </m.Container>
  )
}

export default MyStocksSection
