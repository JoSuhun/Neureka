import React from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

type Props = {}

const RightWordsSection = (props: Props) => {
  const words = Array.from({ length: 10 }, (_, idx) => idx)
  return (
    <>
      <r.Wrapper>
        <r.Title>MARK</r.Title>
        <r.Box>
          {words.map((it, idx) => (
            <WordCard />
          ))}
        </r.Box>
      </r.Wrapper>
    </>
  )
}

export default RightWordsSection
