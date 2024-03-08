import React, { useEffect, useRef, useState } from 'react'
import * as s from '../styles/News/HeaderStyle'

type Props = {}

const Search = (props: Props) => {
  const hotkeywords = [
    '김유산',
    '윤주찬',
    '이기영',
    '이승현',
    '조수훈',
    '최시원',
    '칠칠칠',
    '팔팔팔',
    '구구구',
    '십십십',
  ]
  const [num, setNum] = useState(0)
  const [keyword, setKeyword] = useState(hotkeywords[0])

  // 10개의 키워드 2초마다
  useEffect(() => {
    const interval = setInterval(() => {
      if (num < 9) {
        setNum(prevNum => prevNum + 1)
        setKeyword(hotkeywords[num + 1])
      } else {
        setNum(0)
        setKeyword(hotkeywords[0])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [num])

  return (
    <>
      <s.Wrapper>
        <s.SearchBox>
          <s.SearchBar>
            <s.SearchInput />
            <s.SearchButton type="submit">검색</s.SearchButton>
          </s.SearchBar>
        </s.SearchBox>

        <s.HotKeyword>
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
