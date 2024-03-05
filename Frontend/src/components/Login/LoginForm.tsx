import React from 'react'
import { Wrapper } from '../styles/LoginStyle'

import googlelogo from '../../../public/image/google.png'
import kakaologo from '../../../public/image/kakaotalk.png'

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <>
      <Wrapper>
        <div className="login">
          <p className="title">Login</p>
          <div className="select-btn">
            <img src={kakaologo} alt="kakao-logo" />
            <p>카카오톡으로 간편 로그인</p>
          </div>
          <div className="select-btn">
            <img src={googlelogo} alt="google-logo" />
            <p>구글로 간편 로그인</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default LoginForm
