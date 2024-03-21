import React from 'react'

import * as l from '@src/common/styles/Auth/LoginSectionStyle'

import kakao from '/image/kakao.png'
import google from '/image/google.png'

type Props = {}

const SignupSection = (props: Props) => {
  return (
    <l.Logincontent>
      {/* <p>아직 회원이 아니신가용가리?</p>
      <l.LoginSelect className="kakao">
        <l.LoginIcon src={kakao} />
        <l.LoginMsg>카카오로 간편 로그인</l.LoginMsg>
      </l.LoginSelect>
      <l.LoginSelect className="google">
        <l.LoginIcon src={google} />
        <l.LoginMsg>구글로 간편 로그인</l.LoginMsg>
      </l.LoginSelect> */}
    </l.Logincontent>
  )
}

export default SignupSection
