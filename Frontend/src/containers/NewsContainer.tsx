import Carousel from '@src/components/News/Carousel'
import React from 'react'
import { Wrapper } from './styles/NewsStyle'

type Props = {}

const NewsContainer = (props: Props) => {
  return (
    <>
    <Wrapper>
      <Carousel />
    </Wrapper>
    </>
  )
}

export default NewsContainer
