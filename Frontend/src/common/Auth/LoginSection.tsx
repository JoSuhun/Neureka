import React, { useEffect } from 'react'

import { useAtom } from 'jotai'
import { isLoginAtom } from '@src/stores/authAtom'

// import * as l from '@src/common/styles/Auth/SectionStyle'
// import kakao from '/image/kakao.png'
// import google from '/image/google.png'
// type Props = {}

// const LoginSection = (props: Props) => {
//   const [isLogin, setIsLogin] = useAtom(isLoginAtom)

//   // 구글 로그인 url
//   const google_url = 'http://localhost:8080/oauth2/authorization/google'

//   const login = (url: string) => {
//     window.location.href = url
//     setIsLogin(true)
//   }

//   return (
//     <>
//       <l.Title>로그인</l.Title>
//       <l.Content>
//         <l.Select className="kakao">
//           <l.Icon src={kakao} />
//           <l.Msg>카카오로 간편 로그인</l.Msg>
//         </l.Select>
//         <l.Select className="google" onClick={() => login(google_url)}>
//           <l.Icon src={google} />
//           <l.Msg>구글로 간편 로그인</l.Msg>
//         </l.Select>
//       </l.Content>
//     </>
//   )
// }

// export default LoginSection



// import React from 'react';
import axios from 'axios';

const LoginSection = () => {
  // 구글 로그인 URL
  const googleAuthUrl = 'http://localhost:8080/oauth2/authorization/google';

  // 구글 로그인 요청
  const handleGoogleLogin = async () => {
    try {
      // 구글 로그인 URL로 리다이렉트
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('구글 로그인 오류:', error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <div>
        <button onClick={handleGoogleLogin}>구글로 간편 로그인</button>
      </div>
    </div>
  );
};

export default LoginSection;

