import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isLoginAtom = atomWithStorage<boolean>('isLogin', false)

export const isAccessTokenAtom = atomWithStorage<string | null>(
  'accessToken',
  null,
)
export const isRefreshTokenAtom = atomWithStorage<string | null>(
  'refreshToken',
  null,
)
export const isExpireTimeAtom = atomWithStorage<number>('tokenExpireTime', 0)
