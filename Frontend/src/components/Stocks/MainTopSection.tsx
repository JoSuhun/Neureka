import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'
import Tooltip from '@src/common/Tooltip'

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
          <Tooltip message={'매일 아침 메일을 받아보세요!'}>
            <s.SubscribeButton onClick={() => setIsSubscribe(false)} />
          </Tooltip>
        ) : (
          <Tooltip message={'구독중이에요! 구독을 취소하시겠습니까?'}>
            <s.SubscribingButton onClick={() => setIsSubscribe(true)} />
          </Tooltip>
        )}
        {isLiked ? (
          <Tooltip message={'관심기업에서 삭제하시겠습니까?'}>
            <s.RemoveButton onClick={handleRemoveMyStock} />
          </Tooltip>
        ) : (
          <Tooltip message={'관심기업으로 등록해보세요!'}>
            <s.AddButton onClick={handleAddMyStock} />
          </Tooltip>
        )}
      </s.ButtonWrap>
    </s.Container>
  )
}

export default MainTopSection
