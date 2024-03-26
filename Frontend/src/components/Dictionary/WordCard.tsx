import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

import { Word } from '@src/types/WordType'

import saved from '/image/save.png'
import notsaved from '/image/notsave.png'

import { useMutation } from 'react-query'
import { fetchMarkWord, fetchUnmarkWord } from '@src/apis/DictionaryApi'
import { MarkWord } from '@src/types/WordType'

import { useAtom } from 'jotai'
import { markedWordsAtom, toggleMarkingAtom } from '@src/stores/dictionaryAtom'
import { isLoginAtom } from '@src/stores/authAtom'
import { modalOpenAtom } from '@src/stores/authModalAtom'

type Props = {
  word: Word | null
  marked: boolean
  side: string
}

const WordCard = ({ word, marked, side }: Props) => {
  const [isSave, SetIsSave] = useState(false)
  const [mark, setMark] = useAtom(toggleMarkingAtom)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [openLogin, setOpenLogin] = useAtom(modalOpenAtom)

  // 단어 즐겨찾기
  const { mutate: markMutate } = useMutation(
    (data: MarkWord) => fetchMarkWord(data),
    {
      onSuccess: () => {
        console.log('추가성공!')
        setMark(!mark)
      },
      onError: err => {
        console.log('추가에러! : ' + err)
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
      onError: err => {
        console.log('삭제에러! : ' + err)
      },
    },
  )

  // 즐겨찾기 버튼 클릭 이벤트
  const handleMark = () => {
    if (isLogin) {
      SetIsSave(true)
      markMutate({
        email: 'dbtks2759@gmail.com',
        title: word?.title as string,
      })
    } else {
      setOpenLogin(true)
    }
  }

  // 즐겨찾기 해제 버튼 클릭 이벤트
  const handleUnmark = () => {
    SetIsSave(false)
    unmarkMutate({
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
            {marked && side == 'right' ? (
              <c.deleteBtn onClick={handleUnmark} />
            ) : marked ? (
              <c.saveBtn src={saved} />
            ) : (
              <c.saveBtn src={notsaved} onClick={handleMark} />
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
