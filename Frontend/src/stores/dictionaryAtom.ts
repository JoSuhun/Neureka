import { atom } from 'jotai'
import { Word } from '@src/types/WordType'

export const markedWordsAtom = atom<Word[] | null>(null)

export const toggleMarkingAtom = atom<boolean>(false)
