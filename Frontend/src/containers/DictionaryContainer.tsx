import React, { useEffect } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

type Props = {}

const DictionaryContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <d.Wrapper>
        <d.Box>
          <LeftSearchSection />
          <RightWordsSection />
        </d.Box>
      </d.Wrapper>
    </>
  )
}

export default DictionaryContainer
