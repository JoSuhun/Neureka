import React, { useEffect } from 'react'
import { publicRequest } from '@src/hooks/requestMethod'
import axios from 'axios'

import { useAtom } from 'jotai'
import {
  isLoginAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
  isExpireTimeAtom,
} from '@src/stores/authAtom'
import { getCookie } from './loginCookie'
import { CollectionsBookmarkOutlined } from '@mui/icons-material'

type Props = {}

const TokenChecker = (props: Props) => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [accessToken, setAccessToken] = useAtom(isAccessTokenAtom)
  const [refreshToken, setRefreshToken] = useAtom(isRefreshTokenAtom)
  const [expireTime, setExpireTime] = useAtom(isExpireTimeAtom)

  const refresh = async () => {
    const res = await axios.post('http://localhost:8080/reissue')

    const now = new Date().getTime()
    setExpireTime(now)
    setAccessToken(res.headers.authorization)
    setRefreshToken(getCookie('refresh'))

    console.log('토큰 재발행')
  }

  const update = () => {
    if (expireTime > 0) {
      const now = new Date().getTime()
      const loginTime = Math.round((now - expireTime) / 1000 / 60)

      console.log('로그인 시간: ' + loginTime + '분')

      if (loginTime < 60) {
        refresh()
      } else {
        setIsLogin(false)
        setExpireTime(0)
        setAccessToken('')
        setRefreshToken('')
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
