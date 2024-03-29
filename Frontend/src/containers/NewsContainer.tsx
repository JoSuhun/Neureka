import Carousel from '@src/components/News/Carousel'
import React, { useEffect, useState } from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Header from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

import { useQuery } from 'react-query'
import { fetchNewsList, fetchHotNews, fetchHotSearch } from '@src/apis/NewsApi'
import { useAtom } from 'jotai'
import { questionAtom } from '@src/stores/newsAtom'

type Props = {}

const NewsContainer = (props: Props) => {
  const [search, setSearch] = useAtom(questionAtom)
  const [hotKeywordsData, setHotKeywordsData] = useState<
    | {
        word: string
        count: number
      }[]
    | null
  >(null)
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
      // console.log(res.data)
    },
  })

  const {
    isLoading: isHotKeyworodsLoading,
    data: hotKeywordData,
    isError: isHotKeywordError,
    error: hotKeywordError,
    refetch,
  } = useQuery({
    queryKey: 'hot-keywords',
    queryFn: fetchHotSearch,
    onSuccess: res => {
      setHotKeywordsData(res.data)
    },
  })

  useEffect(() => {
    refetch()
  }, [search])

  if (isNewsListLoading) {
    return <>뉴스 불러오는 중 . . .</>
  }

  if (isHotNewsLoading) {
    return <>인기뉴스 불러오는 중 ...</>
  }

  if (isHotKeyworodsLoading) {
    return <>실시간 인기 검색어 로딩 중 ...</>
  }

  if (isNewsListError) {
    return <>{newsListError}</>
  }

  return (
    <>
      <Carousel hotNewsData={hotNewsData?.data} />
      <Wrapper>
        <Header hotKeywordData={hotKeywordData?.data} />
        <CustomizedNews />
        <NewsList newsData={newsData?.data} />
      </Wrapper>
    </>
  )
}

export default NewsContainer
