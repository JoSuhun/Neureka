import React, { useEffect, useState } from 'react'
import axios from 'axios'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'

import save from '/image/save.png'
import notsave from '/image/notsave.png'
import WordCard from './WordCard'

import { Word } from '@src/types/WordType'
import SearchInput from './SearchInput'

type Props = {}

const LeftSearchSection = (props: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useState<null | string>(null)
  const [words, SetWords] = useState<null | Word[]>(null)
  const [originalWords, SetOriginalWords] = useState<null | Word[]>(null)

  // 전체 단어 조회
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/dictionary/get/list')
      .then(res => {
        console.log(res.data)
        SetWords(res.data)
        SetOriginalWords(res.data)
        setQuestion('')
      })
      .catch(err => console.log(err))
  }, [])

  // 키워드가 제목 또는 내용에 포함된 카드만 조회
  useEffect(() => {
    if (question) {
      const filteredWords = words?.filter(
        word =>
          word.title.includes(question) || word.content.includes(question),
      )
      if (filteredWords) {
        SetWords(filteredWords)
      }
    } else {
      SetWords(originalWords)
    }
  }, [question])

  return (
    <>
      <l.Wrapper>
        <l.Box>
          <l.SearchBar>
            <SearchInput
              search={search}
              setSearch={setSearch}
              question={question}
              setQuestion={setQuestion}
            />
          </l.SearchBar>

          <l.Words>
            {words
              ? words.map((word, idx) => <WordCard word={word} key={idx} />)
              : null}
          </l.Words>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
