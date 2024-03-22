import { useEffect, useState } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import * as m from '@src/containers/styles/MainContainer'
import KeywordNews from '@src/components/Main/KeywordNews'
import BubbleCategory from '@src/components/Main/BubbleCategory'
import BubbleChart from '@src/components/Main/BubbleChart'
import { useAtom } from 'jotai'
import {
  categoriesAtom,
  keywordArticlesAtom,
  keywordsAtom,
  selectedKeywordAtom,
} from '@src/stores/mainAtom'
import { useQuery } from 'react-query'
import { fetchKeywordArticles, fetchKeywords } from '@src/apis/MainApi'
import { KeywordCount } from '@src/types/MainType'

type Props = {}

const MainContainer = (props: Props) => {
  // const [selectedKeyword] = useAtom(selectedKeywordAtom)
  // const [categories] = useAtom(categoriesAtom)
  // const [keywordArticles, setKeywordArticles] = useAtom(keywordArticlesAtom)
  // const [keywords, setKeywords] = useAtom<KeywordCount[]>(keywordsAtom)
  // // // 키워드 데이터 요청
  // const { data: keywordsData, refetch: refetchKeywords } = useQuery(
  //   ['fetchKeywords', categories],
  //   () => fetchKeywords(categories),
  //   {
  //     enabled: false,
  //     onSuccess: data => {
  //       setKeywords(data.data)
  //     },
  //   },
  // )

  // // 키워드 뉴스 데이터 요청
  // const {
  //   data: keuwordNewsData,
  //   refetch: refetchKeywordNews,
  //   isLoading: keywordArticlesLoading,
  // } = useQuery(
  //   ['fetchKeywordArticles', selectedKeyword],
  //   () => fetchKeywordArticles(selectedKeyword.links),
  //   {
  //     enabled: false,
  //     onSuccess: data => {
  //       setKeywordArticles(data.data.data)
  //     },
  //   },
  // )

  // useEffect(() => {
  //   // 필요한 API 요청을 시작합니다.
  //   refetchKeywords()
  // }, [categories, refetchKeywords])

  // useEffect(() => {
  //   // 필요한 API 요청을 시작합니다.
  //   refetchKeywordNews()
  // }, [selectedKeyword, refetchKeywordNews])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <m.container>
        <SlideBar />
        <MainCard />
        <div style={{ height: '50px' }}></div>

        <m.BubbleCategoryWrapper>
          <BubbleCategory />
        </m.BubbleCategoryWrapper>

        <m.BubbleChartWrapper>
          <BubbleChart />
        </m.BubbleChartWrapper>

        <m.NewsWrapper>
          <KeywordNews />
        </m.NewsWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
