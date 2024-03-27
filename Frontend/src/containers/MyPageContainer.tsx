import React, { useEffect } from 'react'
import * as m from '@src/containers/styles/MyPageContainerStyle'
import MyPageHeader from '@src/components/MyPage/MyPageHeader'
import MyInfo from '@src/components/MyPage/MyInfo'
import TokenChecker from '@src/utils/TokenChecker'

type Props = {}

const MyPageContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <TokenChecker />
      <m.Wrapper>
        <m.Box>
          <MyPageHeader />
          <MyInfo />
        </m.Box>
      </m.Wrapper>
    </>
  )
}

export default MyPageContainer
