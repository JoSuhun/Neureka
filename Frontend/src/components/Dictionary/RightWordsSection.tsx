import React, { useEffect, useState } from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

import { Word } from '@src/types/WordType'

type Props = {}

const RightWordsSection = (props: Props) => {
  const [markedWords, SetMarkedWrods] = useState<null | number[]>(null)
  const words = Array.from({ length: 12 }, (_, idx) => idx)
  // const words = null
  useEffect(() => {
    SetMarkedWrods(words)
  }, [])
  return (
    <>
      <r.Wrapper>
        <r.Title>MARK</r.Title>
        {markedWords?.length ? (
          <r.Box>
            {markedWords?.map((it, idx) => <WordCard word={null} />)}
          </r.Box>
        ) : (
          <r.Empty>북마크 된 단어가 없어요</r.Empty>
        )}
      </r.Wrapper>
    </>
  )
}

export default RightWordsSection
