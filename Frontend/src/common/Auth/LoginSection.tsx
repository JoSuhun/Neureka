import React from 'react'

import * as l from '@src/common/styles/Auth/LoginSectionStyle'
import kakao from '/image/kakao.png'
import google from '/image/google.png'
type Props = {}

const LoginSection = (props: Props) => {
  // 로그인 url
  const google_url = 'http://localhost:8080/oauth2/authorization/google'

  const login = (url: string) => {
    window.location.href = url
  }

  return (
    <>
      <l.LoginTitle>로그인</l.LoginTitle>
      <l.Logincontent>
        <l.LoginSelect className="kakao">
          <l.LoginIcon src={kakao} />
          <l.LoginMsg>카카오로 간편 로그인</l.LoginMsg>
        </l.LoginSelect>
        <l.LoginSelect className="google">
          <l.LoginIcon src={google} />
          <l.LoginMsg>구글로 간편 로그인</l.LoginMsg>
        </l.LoginSelect>
      </l.Logincontent>
    </>
  )
}

export default LoginSection
