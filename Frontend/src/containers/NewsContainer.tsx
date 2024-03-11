import Carousel from '@src/components/News/Carousel'
import React, { useEffect } from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Search from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

type Props = {}

const NewsContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Carousel />
      <Wrapper>
        <Search />
        <CustomizedNews />
        <NewsList />
      </Wrapper>
    </>
  )
}

export default NewsContainer
