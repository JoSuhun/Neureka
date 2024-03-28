import React, { useEffect, useRef, useState } from 'react'
import * as s from '../styles/News/HeaderStyle'
import SearchInput from '@src/common/SearchInput'
import { useAtom } from 'jotai'
import { questionAtom } from '@src/stores/newsAtom'
import NewsSearchInput from './NewsSearchInput'

type Props = {
  hotKeywordData: {
    word: string
    count: number
  }[]
}

const Search = ({ hotKeywordData }: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useAtom(questionAtom)
  const [hotKeywords, setHotKeywords] = useState<string[]>([])

  // const hotkeywords = hotKeywordData?.map((keyword, idx) => keyword?.word)
  const hotkeywords = [1, 2, 3, 34, 4]

  const [num, setNum] = useState(0)
  const [keyword, setKeyword] = useState(hotKeywords[0])

  // 10개의 키워드 2초마다
  useEffect(() => {
    const interval = setInterval(() => {
      if (num < hotKeywords?.length - 1) {
        setNum(prevNum => prevNum + 1)
        setKeyword(hotKeywords[num + 1])
      } else {
        setNum(0)
        setKeyword(hotKeywords[0])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [num])

  return (
    <>
      <s.Wrapper className="header-wrapper">
        <s.SearchBar className="search-box">
          <NewsSearchInput
            search={search}
            setSearch={setSearch}
            question={question}
            setQuestion={setQuestion}
          />
        </s.SearchBar>

        <s.HotKeyword className="hot-keyword">
          <s.KeywordTitle>실시간 인기 키워드</s.KeywordTitle>
          <s.SelectBox>
            <s.Label>
              <s.OptionNum>{num + 1}</s.OptionNum>
              {keyword}
            </s.Label>
            <s.SelectOptions>
              {hotkeywords.map((keyword, idx) => (
                <s.Option>
                  <s.OptionNum>{idx + 1}</s.OptionNum>
                  {keyword}
                </s.Option>
              ))}
            </s.SelectOptions>
          </s.SelectBox>
        </s.HotKeyword>
      </s.Wrapper>
    </>
  )
}

export default Search
