import React, { useEffect, useState } from 'react'

import * as c from '@src/components/styles/Dictionary/WordCardStyle'

type Props = {}

const WordCard = (props: Props) => {
  const [word, SetWord] = useState('')
  const [content, SetContent] = useState('')
  useEffect(() => {
    SetWord('공매도')
    SetContent(
      '주식이나 채권을 가지고 있지 않은 상태에서 행사하는 매도주문 특정 종목의 주가가 하락할 것으로 예상되면 해당 주식을 보유하고 있지 않은 상태에서 주식을 빌려 매도 주문을 내는 투자 전략으로, 주로 초단기 매매차익을 노리는 데 사용되는 기법이다.',
    )
  }, [])
  return (
    <>
      <c.Card>
        <c.CardBox>
          <c.Title>{word}</c.Title>
          <c.Content>{content}</c.Content>
        </c.CardBox>
      </c.Card>
    </>
  )
}

export default WordCard
