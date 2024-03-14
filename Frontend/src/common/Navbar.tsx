import React, { useEffect, useState } from 'react'
import * as n from './styles/NavbarStyle'
import { useNavigate } from 'react-router-dom'

import kakao from '/image/kakaotalk.png'
import google from '/image/google.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
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

  const login = (url: string) => {
    window.location.href = url
  }

  // 스크롤 시 네비게이션 색상 변경
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScroll)
  })

  return (
    <>
      <n.Wrapper>
        <n.Nav
          className={scrollPosition > 100 ? `nav changed` : `nav original`}
        >
          <n.NavTitle className="title" onClick={goHome}>
            <span>N</span>
            Eureka
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
        <n.LoginBox className={isLoginOpen ? 'login-open' : 'login-close'}>
          <n.MenuList>
            <n.LoginSelect className="login-selector">
              <n.LoginIcon src={kakao} />
              카카오톡으로 시작하기
            </n.LoginSelect>
            <n.LoginSelect
              className="login-selector"
              onClick={() => login(google_url)}
            >
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
