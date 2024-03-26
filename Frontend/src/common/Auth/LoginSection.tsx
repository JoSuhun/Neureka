import React, { useState } from 'react';
import axios from 'axios';

const LoginSection = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const google_url = 'http://localhost:8080/oauth2/authorization/google';

  const login = (url:string) => {
    axios.get(url)
      .then(response => {
        // 응답 처리
        console.log(response.data); // 응답 데이터 출력
        setIsLogin(true); // 로그인 상태 변경
        setErrorMessage(''); // 에러 메시지 초기화
      })
      .catch(error => {
        // 에러 처리
        console.error('Error:', error);
        setIsLogin(false); // 로그인 상태 변경
        setErrorMessage('로그인에 실패했습니다.'); // 에러 메시지 설정
      });
  }

  return (
    <>
      <div>
        <h2>로그인</h2>
        <button onClick={() => login(google_url)}>구글로 간편 로그인</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default LoginSection;
