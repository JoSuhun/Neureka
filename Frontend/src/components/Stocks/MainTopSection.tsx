import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { MainTopSectionProps } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = ({ handleAddMyStock }: MainTopSectionProps) => {
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.AddButton onClick={handleAddMyStock} />
    </s.Container>
  )
}

export default MainTopSection
