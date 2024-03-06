import React, { useEffect, useState } from 'react'
import * as n from './styles/NavbarStyle'
import { useNavigate } from 'react-router-dom'

import kakao from '/image/kakaotalk.png'
import google from '/image/google.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()

  const navtoggle = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isLoginOpen) {
      setIsLoginOpen(false)
    }
  }
  const logintoggle = () => {
    setIsLoginOpen(!isLoginOpen)
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  const goHome = () => {
    navigate('/')
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    if (isLoginOpen) {
      setIsLoginOpen(false)
    }
  }

  const goNews = () => {
    navigate('/news')
    navtoggle()
  }

  const goStocks = () => {
    navigate('/stocks')
    navtoggle()
  }

  const google_url = 'http://localhost:8080/oauth2/authorization/google'

  const SNS = (url: string) => {
    console.log('qqq')
    window.location.href = url
  }

  return (
    <>
      <n.Wrapper>
        <n.Nav className="nav">
          <span></span>
          <n.NavTitle className="title" onClick={goHome}>
            STOCKER
          </n.NavTitle>
          <n.NavButton className="button-section">
            <n.LoginBtn className="login-btn" onClick={logintoggle}>
              LOGIN
            </n.LoginBtn>
            <n.MenuBtn onClick={navtoggle}>MENU</n.MenuBtn>
          </n.NavButton>
        </n.Nav>
        <n.MenuBox
          className={
            isMenuOpen
              ? 'navbar-container nav-open'
              : 'navbar-container nav-close'
          }
        >
          <n.MenuList className="nav-selector">
            <n.MenuSelect onClick={goHome}>HOME</n.MenuSelect>
            <n.MenuSelect onClick={goNews}>오늘의 뉴스 확인하기</n.MenuSelect>
            <n.MenuSelect onClick={goStocks}>나의 종목 뉴스</n.MenuSelect>
            <n.MenuSelect>개인 정보 설정</n.MenuSelect>
          </n.MenuList>
        </n.MenuBox>
        <n.LoginBox
          className={
            isLoginOpen
              ? 'navbar-container login-open'
              : 'navbar-container login-close'
          }
        >
          <n.MenuList className="nav-selector">
            <n.LoginSelect>
              <n.LoginIcon src={kakao} />
              카카오톡으로 시작하기
            </n.LoginSelect>
            <n.LoginSelect onClick={() => SNS(google_url)}>
              <n.LoginIcon src={google} />
              구글로 시작하기
            </n.LoginSelect>
          </n.MenuList>
        </n.LoginBox>
      </n.Wrapper>
    </>
  )
}

export default Navbar
