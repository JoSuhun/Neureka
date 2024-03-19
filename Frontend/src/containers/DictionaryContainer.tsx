import React, { useEffect, useState } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

import { useQuery } from 'react-query'
import axios from 'axios'

import { Word } from '@src/types/WordType'

type Props = {}

const DictionaryContainer = (props: Props) => {
  // const [words, SetWords] = useState<null | Word[]>(null)
  // const [originalWords, SetOriginalWords] = useState<null | Word[]>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getWords = async () => {
    return await axios.get('http://localhost:8080/api/v1/dictionary/get/list')
  }

  const { isLoading, data, isError, error } = useQuery('get-words', getWords)

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
