import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { useQuery, useMutation } from 'react-query'
import {
  fetchCompanyList,
  fetchCompanyPrice,
  fetchCompanyLikeList,
  fetchCompanyLike,
  fetchCompanyUnLike,
  fetchCompanyLatestList,
  fetchCompanyLatest,
  fetchCompanyNewsList,
} from '@src/apis/StockApi'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import SearchStocksSection from '@src/components/Stocks/SearchStocksSection'
import MyStocksSection from '@src/components/Stocks/MyStocksSection'
import LatestStocksSection from '@src/components/Stocks/LatestStocksSection'
import MainTopSection from '@src/components/Stocks/MainTopSection'
import StockPriceSection from '@src/components/Stocks/StockPriceSection'
import StockChartSection from '@src/components/Stocks/StockChartSection'
import StockNewsSection from '@src/components/Stocks/StockNewsSection'
import Loading from '@src/common/Loading'
import * as s from '@src/containers/styles/StocksContainerStyle'
import StockTutorial from '@src/tutorials/StockTutorial'

const StocksContainer = () => {
  // 데이터 로딩 상태를 관리하는 상태 변수 추가
  const [isTutorialReady, setIsTutorialReady] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 기업
  const [, setLikedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트

  const user = {
    user_id: 1,
    email: 'dbtks2759@gmail.com',
    name: '김유산',
    role: 'ROLE_USER',
    username: 'google 117226197043183171022',
  }

  // 기업 전체 조회
  const { data: companyList } = useQuery({
    queryKey: ['CompanyList'],
    queryFn: fetchCompanyList,
  })

  // 선택 기업 차트 데이터 조회
  const { data: companyPriceList, refetch: refetchCompanyPriceList } = useQuery(
    {
      queryKey: ['CompanyPriceList'],
      queryFn: () => fetchCompanyPrice(selectedStock.code),
    },
  )

  // 선택 기업 최근 뉴스 조회
  const { data: companyNewsList, refetch: refetchCompanyNewsList } = useQuery({
    queryKey: ['CompanyNewsList'],
    queryFn: () => fetchCompanyNewsList(selectedStock.companyName),
  })

  // 관심 기업 조회
  const { data: companyLikeList, refetch: refetchCompanyLikeList } = useQuery({
    queryKey: ['CompanyLikeList'],
    queryFn: () => fetchCompanyLikeList(user.email),
    onSuccess: data => {
      setLikedCompanyList(data) // 관심 기업 업데이트
    },
  })

  // 관심 기업 등록
  const { mutate: likeCompany } = useMutation({
    mutationKey: ['LikeCompany'],
    mutationFn: fetchCompanyLike,
    onSuccess: () => refetchCompanyLikeList(), // 관심 기업 조회 refetch
  })

  const handleAddMyStock = () => {
    const email = 'dbtks2759@gmail.com'
    const params = {
      email,
      code: selectedStock.code,
    }
    likeCompany(params)
  }

  // 관심 기업 등록 취소
  const { mutate: unLikeCompany } = useMutation({
    mutationKey: ['UnLikeCompany'],
    mutationFn: fetchCompanyUnLike,
    onSuccess: () => refetchCompanyLikeList(), // 관심 기업 조회 refetch
  })

  const handleRemoveMyStock = () => {
    const email = 'dbtks2759@gmail.com'
    const params = {
      email,
      code: selectedStock.code,
    }
    unLikeCompany(params)
  }

  // 최근 조회 기업 조회
  const { data: companyLatestList, refetch: refetchCompanyLatestList } =
    useQuery({
      queryKey: ['CompanyLatestList'],
      queryFn: () => fetchCompanyLatestList(user.email),
    })

  // 최근 조회 기업 등록
  const { mutate: latestCompany } = useMutation({
    mutationKey: ['LatestCompany'],
    mutationFn: fetchCompanyLatest,
    onSuccess: () => refetchCompanyLatestList(), // 최근 조회 기업 조회 refetch
  })

  const handleAddLatestCompany = () => {
    const email = 'dbtks2759@gmail.com'
    const params = {
      email,
      code: selectedStock.code,
      companyName: selectedStock.companyName,
    }
    latestCompany(params)
  }

  useEffect(() => {
    refetchCompanyPriceList() // 선택 기업 변경 시, 차트 데이터 refetch
    handleAddLatestCompany() // 선택 기업 변경 시, 최근 조회 기업 등록 refetch
    refetchCompanyNewsList() // 선택 기업 변경 시, 최근 뉴스 조회 refetch
  }, [selectedStock])

  // 데이터 로딩 관련 상태 업데이트
  useEffect(() => {
    if (companyList && companyNewsList) {
      setIsTutorialReady(true) // 모든 데이터가 로딩되었다면 true로 설정
      console.log(1111)
    }
  }, [companyList, companyNewsList])

  return (
    <s.Container>
      {isTutorialReady ? <StockTutorial /> : null}
      <s.SidebarWrap>
        {companyList ? <SearchStocksSection data={companyList} /> : <Loading />}
        <MyStocksSection data={companyLikeList} />
        <LatestStocksSection data={companyLatestList} />
      </s.SidebarWrap>
      <s.MainWrap>
        <MainTopSection
          handleAddMyStock={handleAddMyStock}
          handleRemoveMyStock={handleRemoveMyStock}
        />
        {companyPriceList ? (
          <>
            <StockPriceSection data={companyPriceList} />
            <StockChartSection initialData={companyPriceList} />
          </>
        ) : (
          <Loading />
        )}
        <StockNewsSection data={companyNewsList} />
      </s.MainWrap>
    </s.Container>
  )
}

export default StocksContainer
