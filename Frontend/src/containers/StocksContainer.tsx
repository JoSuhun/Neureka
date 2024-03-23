import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useQuery, useMutation } from 'react-query'
import {
  fetchCompanyList,
  fetchCompanyPrice,
  fetchCompanyLikeList,
  fetchCompanyLike,
} from '@src/apis/StockApi'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
} from '@src/stores/stockAtom'
import SearchStocksSection from '@src/components/Stocks/SearchStocksSection'
import MyStocksSection from '@src/components/Stocks/MyStocksSection'
import LatestStocksSection from '@src/components/Stocks/LatestStocksSection'
import MainTopSection from '@src/components/Stocks/MainTopSection'
import StockNewsSection from '@src/components/Stocks/StockNewsSection'
import StockPriceSection from '@src/components/Stocks/StockPriceSection'
import StockChartSection from '@src/components/Stocks/StockChartSection'
import CorpInfoSection from '@src/components/Stocks/CorpInfoSection'
import * as s from '@src/containers/styles/StocksContainerStyle'

const StocksContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 기업
  const [likedCompanyList, setLikedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트

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

  useEffect(() => {
    refetchCompanyPriceList()
  }, [selectedStock, refetchCompanyPriceList])

  return (
    <s.Container>
      <s.SidebarWrap>
        {companyList ? (
          <SearchStocksSection data={companyList} />
        ) : (
          <div>Loading!</div>
        )}
        <MyStocksSection data={companyLikeList} />
        <LatestStocksSection />
      </s.SidebarWrap>
      <s.MainWrap>
        <MainTopSection handleAddMyStock={handleAddMyStock} />
        <StockNewsSection />
        <StockPriceSection />
        {companyPriceList ? (
          <StockChartSection initialData={companyPriceList} />
        ) : (
          <div>Loading!</div>
        )}
      </s.MainWrap>
    </s.Container>
  )
}

export default StocksContainer
