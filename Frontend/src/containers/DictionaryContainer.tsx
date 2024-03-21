import React, { useEffect, useState } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

import { useQuery } from 'react-query'
import { fetchWords } from '@src/apis/DictionaryApi'

import { Word } from '@src/types/WordType'

type Props = {}

const DictionaryContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { isLoading, data, isError, error } = useQuery('get-words', fetchWords)

  if (isLoading) return <>Loading . . .</>
  if (isError) return <>{error}</>

  return (
    <>
      <d.Wrapper>
        <d.Box>
          <LeftSearchSection data={data?.data} />
          <RightWordsSection />
        </d.Box>
      </d.Wrapper>
    </>
  )
}

export default DictionaryContainer
