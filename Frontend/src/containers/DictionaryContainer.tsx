import React, { useEffect, useState } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

import { useQuery } from 'react-query'
import { fetchWords, fetchMarkedWords } from '@src/apis/DictionaryApi'

import { Word } from '@src/types/WordType'

import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { useAtom } from 'jotai'

type Props = {}

const DictionaryContainer = (props: Props) => {
  const [markedWords, setMarkedWords] = useState<any>(null)
  const [mark, setMark] = useAtom(toggleMarkingAtom)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    refetch()
  }, [mark])

  const {
    isLoading: isLoadingWords,
    data: wordsData,
    isError: isErrorWords,
    error: errorWords,
  } = useQuery('get-words', fetchWords)

  const {
    isLoading: isLoadingMarked,
    data: markedData,
    isError: isErrorMarked,
    error: errorMarked,
    refetch,
  } = useQuery({
    queryKey: 'get-marked',
    queryFn: () => fetchMarkedWords('dbtks2759@gmail.com'),
    onSuccess: res => {
      setMarkedWords(res)
    },
  })

  if (isLoadingWords || isLoadingMarked) return <>Loading . . .</>
  if (isErrorWords || isErrorMarked) return <>error</>

  return (
    <>
      <d.Wrapper>
        <d.Box>
          <LeftSearchSection data={wordsData?.data} />
          <RightWordsSection data={markedWords?.data} />
        </d.Box>
      </d.Wrapper>
    </>
  )
}

export default DictionaryContainer
