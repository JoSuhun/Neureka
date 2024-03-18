import { useState } from 'react'
import { useAtom } from 'jotai'
import { selectedStockAtom } from '@src/stores/stockAtom'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = () => {
  const [addMyStock, setAddMyStock] = useState() // my stock 등록
  const [selectedStock, setSelectedStock] = useAtom(selectedStockAtom) // select 한 종목
  // seletedStock 이 빈문자열 -> 상태 초기값 설정 필요
  // usemutation 사용하여 등록 필요

  const handleAddMyStock = () => {}

  return (
    <s.Container>
      <s.Title>{selectedStock.name}</s.Title>
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
