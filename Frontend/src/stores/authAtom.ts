import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isLoginAtom = atomWithStorage<boolean>('isLogin', false)

export const isAccessTokenAtom = atomWithStorage<string>('accessToken', '')
export const isRefreshTokenAtom = atomWithStorage<string>('refreshToken', '')
export const isExpireTimeAtom = atomWithStorage<number>('tokenExpireTime', 0)
