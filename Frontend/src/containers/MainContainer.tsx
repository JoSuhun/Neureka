import { useEffect, useRef, useState } from 'react'
import SlideBar from '@src/components/Main/SlideBar'
import MainCard from '@src/components/Main/MainCard'
import * as m from '@src/containers/styles/MainContainer'
import KeywordNews from '@src/components/Main/KeywordNews'
import BubbleCategory from '@src/components/Main/BubbleCategory'
import BubbleChart from '@src/components/Main/BubbleChart'
import loading from '/image/loading.gif'
import { useAtom, useAtomValue } from 'jotai'
import { categoriesAtom, selectedKeywordAtom } from '@src/stores/mainAtom'
import { useQuery } from 'react-query'
import { fetchKeywordNews, fetchKeywords } from '@src/apis/MainApi'
import MainTutorial from '@src/tutorials/MainTutorial'
import { fetchUserInfo } from '@src/apis/AuthApi'
import { isLoginAtom, isUserAtom, isUserEmailAtom } from '@src/stores/authAtom'
import useMoveScroll from '@src/hooks/clickToScrollMethod';
type Props = {}

const MainContainer = (props: Props) => {
  const [runTutorial, setRunTutorial] = useState(false)
  const tutorialStartRef = useRef<HTMLDivElement | null>(null)
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom);
  const [categories] = useAtom(categoriesAtom)
  const userEmail = useAtomValue(isUserEmailAtom)
  const [userInfo, setUserInfo] = useAtom(isUserAtom)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const { element: newsWrapperRef, onMoveToElement: moveToNewsWrapper } = useMoveScroll();

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
    isLoading: keywordNewsLoading,
  } = useQuery(
    ['fetchKeywordNews', selectedKeyword],
    () => fetchKeywordNews(selectedKeyword.ids),
    {
      onSuccess: () => {
        if (selectedKeyword.ids.length > 0 ) {
          setTimeout(() => moveToNewsWrapper(), 100);
        }
      },
      enabled: selectedKeyword.ids.length > 0,
    },
  )

  // 유저 정보 조회하기
  const {
    isLoading: isUserInfoLoading,
    data: userInfoData,
    isError: isUserInfoError,
    error: userInfoError,
    refetch: userInfoRef,
  } = useQuery({
    queryKey: 'userInfo',
    queryFn: () => fetchUserInfo(userEmail as string),
    onSuccess: res => {
      console.log(res.data)
      setUserInfo({
        birth: res.data.birth,
        email: res.data.email,
        gender: res.data.gender,
        name: res.data.name,
        nickname: res.data.nickname,
        phone: res.data.phone,
        userInfoId: res.data.userInfoId,
      })
    },
  })

  useEffect(() => {
    if (isLogin) {
      userInfoRef()
    }
  }, [userEmail])

  useEffect(() => {
    refetchKeywordNews()
  }, [selectedKeyword, refetchKeywordNews])


  useEffect(() => {
    // 컴포넌트가 마운트될 때(selectedKeywordAtom을 사용하는 페이지가 로드될 때),
    // selectedKeywordAtom의 값을 초기값으로 설정합니다.
    setSelectedKeyword({keyword: '', count: 0, ids: []});
  }, [setSelectedKeyword]); // setSelectedKeyword 함수가 변경되지 않기 때문에, 의존성 배열에 추가합니다.

  useEffect(() => {
    // window.scrollTo(0, 0)
    window.scrollTo(0, 0);
    const checkScroll = () => {
      if (tutorialStartRef.current) {
        const rect = tutorialStartRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight) {
          setRunTutorial(true)
          window.removeEventListener('scroll', checkScroll)
        }
      }
    }

    window.addEventListener('scroll', checkScroll)

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
          {keywordsData && keywordsData?.data ? (
            <BubbleChart keywords={keywordsData?.data} />
          ) : (
            <div>데이터를 불러오는 중...</div>
          )}
        </m.BubbleChartWrapper>

        <m.NewsWrapper ref={newsWrapperRef}>
          {keywordNewsLoading ? (
            <div>
              <h1>기사 받는 중</h1>
              <img src={loading}></img>
            </div>
          ) : (
            <KeywordNews keywordNews={keywordNewsData?.data?.data} />
          )}
        </m.NewsWrapper>
      </m.container>
    </>
  )
}

export default MainContainer
