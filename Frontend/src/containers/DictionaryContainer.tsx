import React, { useEffect, useState } from 'react'
import * as d from '@src/containers/styles/DictionaryContainerStyle'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import RightWordsSection from '@src/components/Dictionary/RightWordsSection'

import { useQuery } from 'react-query'
import { fetchWords, fetchMarkedWords } from '@src/apis/DictionaryApi'

import { Word } from '@src/types/WordType'

import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { useAtom } from 'jotai'
import DictionaryTutorial from '@src/tutorials/DIctionaryTutorial'
import { isUserEmailAtom } from '@src/stores/authAtom'

type Props = {}

const DictionaryContainer = (props: Props) => {
  const [markedWords, setMarkedWords] = useState<any>(null)
  const [mark, setMark] = useAtom(toggleMarkingAtom)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)

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
    queryFn: () => fetchMarkedWords(userEmail),
    onSuccess: res => {
      setMarkedWords(res)
    },
  })

  if (isLoadingWords || isLoadingMarked) return <>Loading . . .</>
  if (isErrorWords || isErrorMarked) return <>error</>

  return (
    <>
      <d.Wrapper>
        <DictionaryTutorial />
        <d.Box className="dictionaryPage">
          <LeftSearchSection data={wordsData?.data} />
          <RightWordsSection data={markedData?.data} />
        </d.Box>
      </d.Wrapper>
    </>
  )
}

export default DictionaryContainer
