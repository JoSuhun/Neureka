import React, { useEffect, useState } from 'react'
import * as n from '@src/containers/styles/NewsDetailContainerStyle'

import bgimage from '/image/bg-image-newsDetail.jpg'
import ArticleContent from '@src/components/NewsDetail/ArticleContent'
import ArticleGrade from '@src/components/NewsDetail/ArticleGrade'
import SimilarArticle from '@src/components/NewsDetail/SimilarArticle'
import BackBtn from '@src/components/NewsDetail/BackBtn'
import { useMutation, useQuery } from 'react-query'
import {
  fetchGetGrade,
  fetchNewsDetail,
  fetchOtherNews,
} from '@src/apis/NewsApi'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { isLoginAtom, isUserEmailAtom } from '@src/stores/authAtom'
import LeftSearchSection from '@src/components/Dictionary/LeftSearchSection'
import { fetchWords } from '@src/apis/DictionaryApi'
import { OtherNews } from '@src/types/NewsType'

type Props = {
  newsId: string
}

const NewsDetailContainer = ({ newsId }: Props) => {
  const [otherNews, setOtherNews] = useState<OtherNews[] | null>(null)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)

  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)

  const [search, setSearch] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    otherNewsMutate(newsId)
  }, [])

  const navigate = useNavigate()

  const goSearch = () => setSearch(!search)

  const {
    isLoading: isNewsListLoading,
    data: newsData,
    isError: isNewsListError,
    error: newsListError,
  } = useQuery({
    queryKey: ['news-detail', newsId],
    queryFn: () => fetchNewsDetail(newsId),
  })

  const {
    isLoading: isGradeLoading,
    data: newsGrade,
    isError: isGradeError,
    error: gradeError,
    refetch,
  } = useQuery({
    queryKey: 'news-grade',
    queryFn: () => fetchGetGrade(userEmail, newsId),
    onSuccess: res => console.log(res.data),
  })

  const {
    isLoading: isLoadingWords,
    data: wordsData,
    isError: isErrorWords,
    error: errorWords,
    refetch: getWordsRefetch,
  } = useQuery({
    queryKey: 'get-words',
    queryFn: fetchWords,
  })

  const { mutate: otherNewsMutate } = useMutation(
    (newsId: string) => fetchOtherNews(newsId),
    {
      onSuccess: res => {
        setOtherNews(res.data)
      },
    },
  )

  if (isNewsListLoading) {
    return <>뉴스 불러오는 중 . . .</>
  }

  return (
    <>
      <n.HeaderImage bgimage={bgimage} />
      <n.Container>
        <n.SearchSection className={search ? 'show' : ''}>
          <LeftSearchSection data={wordsData?.data} />
        </n.SearchSection>
        <n.GoDictionaryBtn onClick={goSearch}>
          <n.Search />
        </n.GoDictionaryBtn>
        <ArticleContent newsData={newsData?.data} />
        {isLogin ? (
          <ArticleGrade grade={newsGrade?.data} newsId={newsId} />
        ) : null}
        <SimilarArticle otherNewsData={otherNews as OtherNews[]} />
        <BackBtn />
      </n.Container>
    </>
  )
}

export default NewsDetailContainer
