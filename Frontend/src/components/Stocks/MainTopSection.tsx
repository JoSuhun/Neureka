import { useState, useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { isUserEmailAtom } from '@src/stores/authAtom'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import Tooltip from '@src/common/Tooltip'
import * as s from '@src/components/styles/Stocks/MainTopSectionStyle'

const MainTopSection = (props: {
  handleAddMyStock: () => void
  handleRemoveMyStock: () => void
  handleSubscribeCompany: () => void
  handleUnSubscribeCompany: () => void
}) => {
  const {
    handleAddMyStock,
    handleRemoveMyStock,
    handleSubscribeCompany,
    handleUnSubscribeCompany,
  } = props
  const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 종목
  const [likedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트
  const [isLiked, setIsLiked] = useState(false) // 관심 기업 여부
  const currentItem = likedCompanyList.find(
    item => item.company.code === selectedStock.code,
  )

  const handleLikeWithoutLogin = () => {
    alert('관심기업으로 등록하기 위해 로그인을 해주세요.')
  }

  const handleUnLikeWithoutLogin = () => {
    alert('관심기업에서 삭제위해 로그인을 해주세요.')
  }

  const handleSubscribeWithoutLike = () => {
    alert('이메일 구독 서비스를 위해 먼저 관심 기업으로 등록해주세요!')
  }

  useEffect(() => {
    setIsLiked(
      likedCompanyList.some(item => item.company.code === selectedStock.code),
    )
  }, [likedCompanyList, selectedStock])

  return (
    <s.Container>
      <s.Title>{selectedStock.companyName}</s.Title>
      <s.CodeNumber>({selectedStock.code})</s.CodeNumber>
      <s.ButtonWrap className="subscribeBtn">
        {isLiked ? (
          <Tooltip message={'관심기업에서 삭제하시겠습니까?'}>
            <s.RemoveButton onClick={handleRemoveMyStock} />
          </Tooltip>
        ) : (
          <Tooltip message={'관심기업으로 등록해보세요!'}>
            <s.AddButton
              onClick={userEmail ? handleAddMyStock : handleLikeWithoutLogin}
            />
          </Tooltip>
        )}
        {currentItem && currentItem.isSendmail ? (
          <Tooltip message={'구독중이에요! 구독을 취소하시겠습니까?'}>
            <s.SubscribingButton onClick={handleUnSubscribeCompany} />
          </Tooltip>
        ) : (
          <Tooltip message={'매일 아침 메일을 받아보세요!'}>
            <s.SubscribeButton
              onClick={
                isLiked ? handleSubscribeCompany : handleSubscribeWithoutLike
              }
            />
          </Tooltip>
        )}
      </s.ButtonWrap>
    </s.Container>
  )
}

export default MainTopSection
