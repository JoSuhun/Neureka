import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = () => {
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목
  // seletedStock 이 빈문자열 -> 상태 초기값 설정 필요

  // usemutation 사용 -> 등록 필요
  const handleAddMyStock = () => {}

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.AddButton
        onClick={() => {
          handleAddMyStock()
        }}
      />
    </s.Container>
  )
}

export default MainTopSection
