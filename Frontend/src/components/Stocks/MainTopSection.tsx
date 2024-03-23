import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import { MainTopSectionProps } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = ({ handleAddMyStock }: MainTopSectionProps) => {
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목
  const [likedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트
  const [isLiked, setIsLiked] = useState(false) // 관심 기업 여부

  useEffect(() => {
    setIsLiked(
      likedCompanyList.some(item => item.company.code === selectedStock.code),
    )
  }, [likedCompanyList, selectedStock])

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      {isLiked ? (
        <s.RemoveButton />
      ) : (
        <s.AddButton onClick={handleAddMyStock} />
      )}
    </s.Container>
  )
}

export default MainTopSection
