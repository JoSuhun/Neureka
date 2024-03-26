import { useEffect } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import * as m from '@src/containers/styles/MainContainer'
import KeywordNews from '@src/components/Main/KeywordNews'
import BubbleCategory from '@src/components/Main/BubbleCategory'
import BubbleChart from '@src/components/Main/BubbleChart'
import loading from '/image/loading.gif'
import { useAtom } from 'jotai'
import { categoriesAtom, selectedKeywordAtom } from '@src/stores/mainAtom'
import { useQuery } from 'react-query'
import { fetchKeywordArticles, fetchKeywords } from '@src/apis/MainApi'
import MainTutorial from '@src/tutorials/MainTutorial'

type Props = {}

const MainContainer = (props: Props) => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const [categories] = useAtom(categoriesAtom)

  // 키워드 데이터 요청
  const { data: keywordsData, refetch: refetchKeywords } = useQuery(
    ['fetchKeywords', categories],
    () => fetchKeywords(categories),
    {
      enabled: false,
    },
  )

  useEffect(() => {
    refetchKeywords()
  }, [categories, refetchKeywords])

  // 키워드 뉴스 데이터 요청
  const {
    data: keywordNewsData,
    refetch: refetchKeywordNews,
    isLoading: keywordArticlesLoading,
  } = useQuery(
    ['fetchKeywordArticles', selectedKeyword],
    () => fetchKeywordArticles(selectedKeyword.links),
    {
      enabled: false,
    },
  )

  useEffect(() => {
    refetchKeywordNews()
  }, [selectedKeyword, refetchKeywordNews])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <m.container>
        <MainTutorial />
        <SlideBar />
        <MainCard />
        <div style={{ height: '50px' }}></div>

        <m.BubbleCategoryWrapper>
          <BubbleCategory />
        </m.BubbleCategoryWrapper>

        <m.BubbleChartWrapper>
          {keywordsData && keywordsData.data ? (
            <BubbleChart keywords={keywordsData.data} />
          ) : (
            <div>데이터를 불러오는 중...</div>
          )}
        </m.BubbleChartWrapper>

        <m.NewsWrapper>
          {keywordArticlesLoading ? (
            <div>
              <h1>기사 받는 중</h1>
              <img src={loading}></img>
            </div>
          ) : (
            <KeywordNews keywordNews={keywordNewsData?.data.data} />
          )}
        </m.NewsWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
