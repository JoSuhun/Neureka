import { atom } from 'jotai'
import { CompanyType } from '@src/types/CompanyType'

export const selectedCompanyAtom = atom<CompanyType>({
  companyId: 1,
  code: '0005930',
  companyName: '삼성전자',
})
