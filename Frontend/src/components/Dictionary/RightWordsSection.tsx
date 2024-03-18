import React from 'react'

import * as r from '@src/components/styles/Dictionary/RightWordsSectionStyle'
import WordCard from './WordCard'

type Props = {}

const RightWordsSection = (props: Props) => {
  return (
    <>
      <r.Wrapper>
        <r.Title>MARK</r.Title>
        <r.Box>
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
          <WordCard />
        </r.Box>
      </r.Wrapper>
    </>
  )
}

export default RightWordsSection
