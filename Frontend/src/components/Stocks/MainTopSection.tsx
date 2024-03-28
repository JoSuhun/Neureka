import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = (props: {
  handleAddMyStock: () => void
  handleRemoveMyStock: () => void
}) => {
  const { handleAddMyStock, handleRemoveMyStock } = props
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목
  const [likedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트
  const [isLiked, setIsLiked] = useState(false) // 관심 기업 여부
  const [isSubscribe, setIsSubscribe] = useState(false) // 구독 기업 여부

  useEffect(() => {
    setIsLiked(
      likedCompanyList.some(item => item.company.code === selectedStock.code),
    )
  }, [likedCompanyList, selectedStock])

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.ButtonWrap>
        {isSubscribe ? (
          <s.SubscribeButton onClick={() => setIsSubscribe(false)} />
        ) : (
          <s.SubscribingButton onClick={() => setIsSubscribe(true)} />
        )}
        {isLiked ? (
          <s.RemoveButton onClick={handleRemoveMyStock} />
        ) : (
          <s.AddButton onClick={handleAddMyStock} />
        )}
      </s.ButtonWrap>
    </s.Container>
  )
}

export default MainTopSection
