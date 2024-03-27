import { useEffect, useRef, useState } from 'react'
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
  const [runTutorial, setRunTutorial] = useState(false)
  const tutorialStartRef = useRef<HTMLDivElement | null>(null)
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
    const checkScroll = () => {
      if (tutorialStartRef.current) {
        const rect = tutorialStartRef.current.getBoundingClientRect()
        // 화면에 특정 컴포넌트가 보이기 시작하면 튜토리얼 시작
        if (rect.top <= window.innerHeight) {
          setRunTutorial(true)
          // 스크롤 이벤트 리스너 제거
          window.removeEventListener('scroll', checkScroll)
        }
      }
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', checkScroll)

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <>
      <m.container>
        <MainTutorial run={runTutorial} />
        <SlideBar />
        <MainCard />
        <div style={{ height: '50px' }}></div>
        <m.BubbleCategoryWrapper>
          <BubbleCategory />
        </m.BubbleCategoryWrapper>

        <m.BubbleChartWrapper ref={tutorialStartRef}>
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
        <m.TutorialWrapper></m.TutorialWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
