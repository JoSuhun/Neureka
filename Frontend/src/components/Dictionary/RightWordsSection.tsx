import React, { useEffect, useState } from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

import { Word } from '@src/types/WordType'
import { useAtom } from 'jotai'
import { markedWordsAtom } from '@src/stores/dictionaryAtom'

type Props = {
  data: Word[]
}

const RightWordsSection = ({ data }: Props) => {
  const [markedWords, SetMarkedWrods] = useAtom(markedWordsAtom)

  useEffect(() => {
    SetMarkedWrods(data)
  }, [data])

  return (
    <>
      <r.Wrapper>
        <r.Title>MARK</r.Title>
        {markedWords?.length ? (
          <r.Box>
            {markedWords?.map((word: any, idx: number) => (
              <WordCard key={idx} word={word?.dictionary} />
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
