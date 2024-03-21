import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

import { Word } from '@src/types/WordType'

import save from '/image/save.png'
import notsave from '/image/notsave.png'

type Props = {
  word: Word | null
}

const WordCard = ({ word }: Props) => {
  const [isSave, SetIsSave] = useState(false)
  const ToggleSave = () => {
    SetIsSave(!isSave)
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
