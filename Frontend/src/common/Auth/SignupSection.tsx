import React from 'react'

import * as l from '@src/common/styles/Auth/SectionStyle'

import kakao from '/image/kakao.png'
import google from '/image/google.png'

type Props = {}

const SignupSection = (props: Props) => {
  return (
    <>
      <l.Title>회원가입</l.Title>
      <l.Content>
        <l.Select className="kakao">
          <l.Icon src={kakao} />
          <l.Msg>카카오 계정으로 시작하기</l.Msg>
        </l.Select>
        <l.Select className="google">
          <l.Icon src={google} />
          <l.Msg>구글 계정으로 시작하기</l.Msg>
        </l.Select>
      </l.Content>
    </>
  )
}

export default SignupSection
