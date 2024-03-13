import * as s from '@src/components/styles/Stocks/SearchStocksSectionStyle'

const SearchStocksSection = () => {
  return (
    <s.Wrapper>
      <s.SearchBox>
        <s.SearchBar>
          <s.SearchInput />
          <s.SearchButton type="submit">검색</s.SearchButton>
        </s.SearchBar>
      </s.SearchBox>
    </s.Wrapper>
  )
}

export default SearchStocksSection
