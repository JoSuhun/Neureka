import React, { useEffect, useState } from 'react'

import * as s from '@src/components/styles/News/NewsSearchInputStyle'
import { Search } from '@src/types/NewsType'
import { useMutation } from 'react-query'
import { fetchSearch } from '@src/apis/NewsApi'

type Props = {
  search: boolean
  setSearch: (search: boolean) => void
  question: string | null
  setQuestion: (question: string | null) => void
}

const SearchInput = ({ search, setSearch, question, setQuestion }: Props) => {
  const [content, SetContent] = useState('')

  const clearSearch = () => {
    setSearch(false)
    SetContent('')
    setQuestion(null)
  }

  const goSearch = () => {
    setSearch(true)
    setQuestion(content)
  }

  const goSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (content.trim() == '') {
      SetContent('')
      setQuestion(null)
      return
    }
    setSearch(true)
    setQuestion(content)
    const now = new Date()
    const data = {
      word: content,
      searchTime: now.toISOString(),
      swid: 0,
    }
    searchMutate(data)
  }

  const { mutate: searchMutate } = useMutation(
    (data: Search) => fetchSearch(data),
    {
      onSuccess: () => {
        console.log('검색어 저장 성공!' + content.length)
      },
      onError: err => {
        console.log('검색어 저장 실패!' + err)
      },
    },
  )

  return (
    <s.SearchBox>
      <s.SearchBar onSubmit={goSubmit}>
        <s.SearchInput
          value={content}
          onChange={event => SetContent(event.target.value)}
        />
        {/* {search ? (
          <s.ClearButton onClick={clearSearch} />
        ) : ( */}
        <s.SearchButton onClick={goSearch} />
        {/* )} */}
      </s.SearchBar>
    </s.SearchBox>
  )
}

export default SearchInput
