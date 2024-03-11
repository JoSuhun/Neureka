import * as s from '../styles/Stocks/SearchStocksSectionStyle'

import * as h from '../styles/News/HeaderStyle'

const SearchStocksSection = () => {
  return (
    <>
      <s.Wrapper>
        <s.SearchBox>
          <s.SearchBar>
            <s.SearchInput />
            <s.SearchButton type="submit">검색</s.SearchButton>
          </s.SearchBar>
        </s.SearchBox>
      </s.Wrapper>
    </>
  )
}

export default SearchStocksSection
