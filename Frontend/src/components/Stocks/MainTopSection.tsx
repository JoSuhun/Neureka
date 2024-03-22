import { useMutation } from 'react-query'
import { useAtom } from 'jotai'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { fetchCompanyLike } from '@src/apis/StockApi'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = () => {
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const { mutate: likeCompany } = useMutation({
    mutationKey: ['LikeCompany'],
    mutationFn: fetchCompanyLike,
  })

  const handleAddMyStock = () => {
    const email = 'dbtks2759@gmail.com'
    const params = {
      email,
      code: selectedStock.code,
    }
    likeCompany(params)
  }

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.AddButton onClick={handleAddMyStock} />
    </s.Container>
  )
}

export default MainTopSection
