import React, { useState, useEffect } from 'react'
import { StockType } from '@src/types/stockType'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import * as s from '@src/components/styles/Stocks/SearchStocksSectionStyle'

const SearchStocksSection = () => {
  const [kospi200List, setKospi200List] = useState<StockType[]>([]) // 종목 전체 리스트
  const [searchBy, setSearchBy] = useState<string>('name') // select 분류
  const [searchTerm, setSearchTerm] = useState<string>('') // 검색어 입력
  const [showDropdown, setShowDropdown] = useState<boolean>(false) // 필터링 결과 드롭다운 여부

  const handleSearchByChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchBy(event.target.value)
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value)
    setShowDropdown(true) // 검색어 입력 시 드롭다운 표시
  }

  const filteredStocks = kospi200List.filter(stock =>
    searchBy === 'name'
      ? stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      : stock.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const dummyData: StockType[] = [
      { code: '282330', name: 'BGF리테일' },
      { code: '138930', name: 'BNK금융지주' },
      { code: '1040', name: 'CJ' },
      { code: '120', name: 'CJ대한통운' },
      { code: '97950', name: 'CJ제일제당' },
      { code: '5830', name: 'DB손해보험' },
      { code: '990', name: 'DB하이텍' },
      { code: '139130', name: 'DGB금융지주' },
    ]

    setKospi200List(dummyData)
  }, [])

  return (
    <s.Container>
      <s.Title>Search</s.Title>
      <s.Wrap>
        <s.SelectBox value={searchBy} onChange={handleSearchByChange}>
          <option value="name">종목명</option>
          <option value="code">종목코드</option>
        </s.SelectBox>
        <s.SearchBox>
          <s.SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <SearchOutlinedIcon onClick={() => setShowDropdown(true)} />
        </s.SearchBox>
        {showDropdown && (
          <s.ResultWrap>
            {filteredStocks.map(stock => (
              <s.ResultItem key={stock.code}>
                <span>
                  {stock.name} ({stock.code})
                </span>
                <ArrowOutwardIcon />
              </s.ResultItem>
            ))}
          </s.ResultWrap>
        )}
      </s.Wrap>
    </s.Container>
  )
}

export default SearchStocksSection
