import React, { useEffect, useState } from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

import { Word, UserWord } from '@src/types/WordType'
import { useAtom } from 'jotai'
import { markedWordsAtom } from '@src/stores/dictionaryAtom'

type Props = {
  data: UserWord[]
}

const RightWordsSection = ({ data }: Props) => {
  // const [markedWords, SetMarkedWrods] = useAtom(markedWordsAtom)
  const [markedWords, SetMarkedWords] = useAtom(markedWordsAtom)

  useEffect(() => {
    const filtered: Word[] = []
    data?.forEach(word => filtered.push(word.dictionary))
    SetMarkedWords(filtered)
  }, [data])

  return (
    <>
      <r.Wrapper>
        <r.Title>MARK</r.Title>
        {data?.length ? (
          <r.Box>
            {data?.map((word: any, idx: number) => (
              <WordCard
                key={idx}
                word={word?.dictionary}
                marked={true}
                side="right"
              />
            ))}
          </r.Box>
        ) : (
          <r.Empty>북마크 된 단어가 없어요</r.Empty>
        )}
      </r.Wrapper>
    </>
  )
}

export default RightWordsSection
