import React, { useState } from 'react'

import * as s from '@src/common/styles/SearchInputStyle'
import { Content } from '@src/components/styles/NewsDetail/ArticleContentStyle'

type Props = {
  search: boolean
  setSearch: (search: boolean) => void
}

const SearchInput = ({ search, setSearch }: Props) => {
  const [content, SetContent] = useState('')

  const searchToggle = () => {
    setSearch(!search)
  }

  const clearSearch = () => {
    searchToggle()
    SetContent('')
  }

  return (
    <s.SearchBox>
      <s.SearchBar>
        <s.SearchInput
          value={content}
          onChange={event => SetContent(event.target.value)}
        />
        {search ? (
          <s.ClearButton onClick={clearSearch} />
        ) : (
          <s.SearchButton onClick={() => searchToggle()} />
        )}
      </s.SearchBar>
    </s.SearchBox>
  )
}

export default SearchInput
