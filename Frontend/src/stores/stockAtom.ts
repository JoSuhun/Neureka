import { atom } from 'jotai'
import { StockType } from '@src/types/stockType'

export const selectedStockAtom = atom<StockType>({
  code: '',
  name: '',
})
