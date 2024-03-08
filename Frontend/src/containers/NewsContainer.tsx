import Carousel from '@src/components/News/Carousel'
import React from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Search from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

type Props = {}

const NewsContainer = (props: Props) => {
  return (
    <>
      <Wrapper>
        <Carousel />
        <Search />
        <CustomizedNews />
        <NewsList />
      </Wrapper>
    </>
  )
}

export default NewsContainer
