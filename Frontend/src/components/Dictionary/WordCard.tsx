import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

import { Word } from '@src/types/WordType'

import save from '/image/save.png'
import notsave from '/image/notsave.png'

import { useMutation } from 'react-query'
import { fetchMarkWord } from '@src/apis/DictionaryApi'
import { MarkWord } from '@src/types/WordType'

type Props = {
  word: Word | null
}

const WordCard = ({ word }: Props) => {
  const [isSave, SetIsSave] = useState(false)

  // useMutation 기본 사용법
  const { mutate } = useMutation((data: MarkWord) => fetchMarkWord(data), {
    onSuccess: () => {
      console.log('오예!')
    },
    onError: () => {
      console.log('error')
    },
  })

  const ToggleSave = () => {
    SetIsSave(!isSave)
    mutate({
      email: 'dbtks2759@gmail.com',
      title: word?.title as string,
    })
  }

  return (
    <>
      <c.Card>
        <c.CardBox>
          <c.Title>
            <div dangerouslySetInnerHTML={{ __html: word?.title || '' }} />
            {isSave ? (
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
