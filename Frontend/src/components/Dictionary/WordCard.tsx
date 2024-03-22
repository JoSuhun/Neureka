import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

import { Word } from '@src/types/WordType'

import save from '/image/save.png'
import notsave from '/image/notsave.png'

import { useMutation } from 'react-query'
import { fetchMarkWord, fetchUnmarkWord } from '@src/apis/DictionaryApi'
import { MarkWord } from '@src/types/WordType'

import { useAtom } from 'jotai'
import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'

type Props = {
  word: Word | null
  marked: boolean
}

const WordCard = ({ word, marked }: Props) => {
  const [isSave, SetIsSave] = useState(false)
  const [mark, setMark] = useAtom(toggleMarkingAtom)

  // 단어 즐겨찾기
  const { mutate: markMutate } = useMutation(
    (data: MarkWord) => fetchMarkWord(data),
    {
      onSuccess: () => {
        console.log('오예!')
        setMark(!mark)
      },
      onError: () => {
        console.log('추가하기 error')
      },
    },
  )

  //단어 즐겨찾기 해제
  const { mutate: unmarkMutate } = useMutation(
    (data: MarkWord) => fetchUnmarkWord(data),
    {
      onSuccess: () => {
        console.log('삭제성공!')
        setMark(!mark)
      },
      onError: () => {
        console.log('삭제하기 error!!')
      },
    },
  )

  const ToggleSave = () => {
    SetIsSave(!isSave)
    if (isSave) {
      unmarkMutate({
        email: 'dbtks2759@gmail.com',
        title: word?.title as string,
      })
    } else {
      markMutate({
        email: 'dbtks2759@gmail.com',
        title: word?.title as string,
      })
    }
  }

  return (
    <>
      <c.Card>
        <c.CardBox>
          <c.Title>
            <div dangerouslySetInnerHTML={{ __html: word?.title || '' }} />
            {isSave || marked ? (
              <c.saveBtn src={save} onClick={ToggleSave} />
            ) : (
              <c.saveBtn src={notsave} onClick={ToggleSave} />
            )}
          </c.Title>
          <c.Content>
            <div dangerouslySetInnerHTML={{ __html: word?.content || '' }} />
          </c.Content>
        </c.CardBox>
      </c.Card>
    </>
  )
}

export default WordCard
