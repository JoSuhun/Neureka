import React, { useState } from 'react'

import * as s from '@src/common/styles/SearchInputStyle'
import { Content } from '@src/components/styles/NewsDetail/ArticleContentStyle'

type Props = {
  search: boolean
  setSearch: (search: boolean) => void

  setQuestion: (question: string) => void
}

const SearchInput = ({ search, setSearch, setQuestion }: Props) => {
  const [content, SetContent] = useState('')

  const clearSearch = () => {
    setSearch(false)
    SetContent('')
  }

  const goSearch = () => {
    setSearch(true)
    setQuestion(content)
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
          <s.SearchButton onClick={goSearch} />
        )}
      </s.SearchBar>
    </s.SearchBox>
  )
}

export default SearchInput
