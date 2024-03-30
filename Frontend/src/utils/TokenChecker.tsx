import React, { useEffect } from 'react'
import { publicRequest } from '@src/hooks/requestMethod'
import axios from 'axios'

import { useAtom } from 'jotai'
import {
  isLoginAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
  isExpireTimeAtom,
  isUserAtom,
  isUserEmailAtom,
} from '@src/stores/authAtom'
import { getCookie, removeCookie } from './loginCookie'
import { CollectionsBookmarkOutlined } from '@mui/icons-material'

type Props = {}

const TokenChecker = (props: Props) => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [accessToken, setAccessToken] = useAtom(isAccessTokenAtom)
  const [refreshToken, setRefreshToken] = useAtom(isRefreshTokenAtom)
  const [expireTime, setExpireTime] = useAtom(isExpireTimeAtom)
  const [userInfo, setUserInfo] = useAtom(isUserAtom)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)

  const refresh = async () => {
    const res = await axios.post('http://localhost:8080/reissue')

    const now = new Date().getTime()
    setExpireTime(now)
    setAccessToken(res.headers.authorization)
    setRefreshToken(getCookie('refresh'))

    console.log('토큰 재발행')
  }

  const update = () => {
    if (expireTime) {
      const now = new Date().getTime()
      const loginTime = Math.round((now - expireTime) / 1000 / 60)

      console.log('로그인 시간: ' + loginTime + '분')

      if (loginTime < 60) {
        refresh()
      } else {
        setIsLogin(false)
        setExpireTime(null)
        setAccessToken('')
        setRefreshToken('')
        setUserEmail('')
        setUserInfo({
          userInfoId: null,
          name: null,
          nickname: null,
          email: null,
          phone: null,
          birth: null,
          gender: null,
        })
        removeCookie('Authorization')
        removeCookie('refresh')
        localStorage.removeItem('accessToken')
        console.log('토큰 만료로 로그아웃됨')
      }
    }
  }

  useEffect(() => {
    update()
  }, [])

  return <div></div>
}

export default TokenChecker
