import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const isLoginAtom = atomWithStorage<boolean>('isLogin', false)
 