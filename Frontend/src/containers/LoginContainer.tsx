import React from 'react'
import Navbar from '../common/Navbar'
import LoginForm from '../components/Login/LoginForm'
import SlideBar from '../components/Main/SlideBar'

const LoginContainer = () => {
  return (
    <>
      <Navbar />
      <SlideBar />
      <LoginForm />
    </>
  )
}

export default LoginContainer
