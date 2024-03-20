import React from 'react'
import * as m from '@src/containers/styles/MyPageContainerStyle'
import MyPageHeader from '@src/components/MyPage/MyPageHeader'
import MyInfo from '@src/components/MyPage/MyInfo'

type Props = {}

const MyPageContainer = (props: Props) => {
  return (
    <>
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
