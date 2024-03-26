import { atom } from 'jotai'
import { CompanyType, CompanyLikeType } from '@src/types/CompanyType'

export const selectedCompanyAtom = atom<CompanyType>({
  companyId: 1,
  code: '005930',
  companyName: '삼성전자',
})

export const LikedCompanyListAtom = atom<CompanyLikeType[]>([])
