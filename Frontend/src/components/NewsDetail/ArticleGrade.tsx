import React from 'react'

import * as g from '@src/components/styles/NewsDetail/ArticleGradeStyle'

import Rating from '@mui/material/Rating'

type Props = {}

const ArticleGrade = (props: Props) => {
  const [value, setValue] = React.useState<number | null>(3)

  return (
    <>
      <g.Wrapper>
        <g.GradeMsg>다음에도 이 주제의 기사를 읽고 싶으신가요?</g.GradeMsg>
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        />
      </g.Wrapper>
    </>
  )
}

export default ArticleGrade
