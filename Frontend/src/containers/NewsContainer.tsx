import Carousel from '@src/components/News/Carousel'
import React, { useEffect } from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Search from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

import { useQuery } from 'react-query'
import { fetchNewsList } from '@src/apis/NewsApi'

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
    refetch,
  } = useQuery({
    queryKey: 'get-news',
    queryFn: fetchNewsList,
    // onSuccess: () => {
    //   console.log(newsData)
    // },
  })

  if (isNewsListLoading) {
    return <>뉴스 불러오는 중 . . .</>
  }

  if (isNewsListError) {
    return <>{newsListError}</>
  }

  return (
    <>
      <Carousel />
      <Wrapper>
        <Search />
        <CustomizedNews />
        <NewsList newsData={newsData?.data} />
      </Wrapper>
    </>
  )
}

export default NewsContainer
