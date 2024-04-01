import Carousel from '@src/components/News/Carousel'
import React, { useEffect, useRef, useState } from 'react'
import { Wrapper } from './styles/NewsContainerStyle'
import Header from '@src/components/News/Header'
import CustomizedNews from '@src/components/News/CustomizedNews'
import NewsList from '@src/components/News/NewsList'

import { useMutation, useQuery } from 'react-query'
import {
  fetchNewsList,
  fetchHotNews,
  fetchHotSearch,
  fetchRecommendNews,
} from '@src/apis/NewsApi'
import { useAtom, useAtomValue } from 'jotai'
import { questionAtom } from '@src/stores/newsAtom'
import { RecommendNews, SearchRecommend } from '@src/types/NewsType'
import Loading from '@src/common/Loading'
import { isLoginAtom } from '@src/stores/authAtom'

type Props = {}

const NewsContainer = (props: Props) => {
  const [search, setSearch] = useAtom(questionAtom)
  const [recommendNews, setRecommendNews] = useState<RecommendNews[] | null>(
    null,
  )
  const [hotKeywordsData, setHotKeywordsData] = useState<
    | {
        word: string
        count: number
      }[]
    | null
  >(null)
  const isLogin = useAtomValue(isLoginAtom)

  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { mutate: recommendNewsMutate } = useMutation(
    (data: SearchRecommend) => fetchRecommendNews(data),
    {
      onSuccess: res => {
        setRecommendNews(res.data)
      },
    },
  )

  useEffect(() => {
    recommendNewsMutate({
      user_id: userEmail,
      topic: [],
    })
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
    return (
      <>
        <Loading />
      </>
    )
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
        {isLogin ? (
          <CustomizedNews
            recommendNewsData={recommendNews as RecommendNews[]}
          />
        ) : null}
        <Header hotKeywordData={hotKeywordData?.data} />
        <NewsList newsData={newsData?.data} />
      </Wrapper>
    </>
  )
}

export default NewsContainer
