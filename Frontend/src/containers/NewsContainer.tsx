import Carousel from '@src/components/News/Carousel'
import React, { useEffect } from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Search from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

import { useQuery } from 'react-query'
import { fetchNewsList, fetchHotNews } from '@src/apis/NewsApi'

type Props = {}

const NewsContainer = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
  } = useQuery({
    queryKey: 'get-news',
    queryFn: fetchNewsList,
  })

  const {
    isLoading: isHotNewsLoading,
    data: hotNewsData,
    isError: isHotNewsError,
    error: hotNewsError,
  } = useQuery({
    queryKey: 'get-hot-news',
    queryFn: fetchHotNews,
    onSuccess: res => {
      console.log(res.data)
    },
  })

  if (isNewsListLoading) {
    return <>뉴스 불러오는 중 . . .</>
  }

  if (isHotNewsLoading) {
    return <>인기뉴스 불러오는 중 ...</>
  }

  if (isNewsListError) {
    return <>{newsListError}</>
  }

  return (
    <>
      <Carousel hotNewsData={hotNewsData?.data} />
      <Wrapper>
        <Search />
        <CustomizedNews />
        <NewsList newsData={newsData?.data} />
      </Wrapper>
    </>
  )
}

export default NewsContainer
