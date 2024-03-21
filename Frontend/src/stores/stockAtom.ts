import { atom } from 'jotai'
import { CompanyType } from '@src/types/CompanyType'

export const selectedCompanyAtom = atom<CompanyType>({
  companyId: 0,
  code: 0,
  companyName: '',
})
