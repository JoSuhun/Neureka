import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'

import save from '/image/save.png'
import notsave from '/image/notsave.png'
import WordCard from './WordCard'

import { Word } from '@src/types/WordType'
import SearchInput from './SearchInput'

import { useAtom, useAtomValue } from 'jotai'
import { markedWordsAtom } from '@src/stores/dictionaryAtom'

type Props = {
  data: Word[] | null
}

const LeftSearchSection = ({ data }: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useState<null | string>(null)
  const [words, SetWords] = useState<null | Word[]>(data)
  const [originalWords, SetOriginalWords] = useState<null | Word[]>(data)

  const markedWords = useAtomValue(markedWordsAtom)

  const boxRef = useRef<HTMLDivElement>(null)

  // 키워드 검색 시 제목 또는 내용에 포함된 카드만 조회 (검색 내용이 없을 시 전체 단어 보여줌)
  useEffect(() => {
    if (question) {
      const filteredWords = data?.filter(
        word =>
          word.title.includes(question) || word.content.includes(question),
      )
      if (filteredWords) {
        const regex = new RegExp(question, 'g')
        const highlightedWords = filteredWords.map(word => ({
          ...word,
          title: word.title.replace(
            regex,
            "<span class='highlight'>" + question + '</span>',
          ),
          content: word.content.replace(
            regex,
            "<span class='highlight'>" + question + '</span>',
          ),
        }))
        SetWords(highlightedWords)
      }
    } else {
      SetWords(originalWords)
    }

    if (boxRef.current) {
      boxRef.current.scrollTo(0, 0)
    }
  }, [question])

  return (
    <>
      <l.Wrapper className="searchSection">
        <l.Box>
          <l.SearchBar className="searchBar">
            <SearchInput
              search={search}
              setSearch={setSearch}
              question={question}
              setQuestion={setQuestion}
            />
          </l.SearchBar>

          <l.Words ref={boxRef}>
            {words && words.length > 0 ? (
              words.map((word, idx) =>
                markedWords?.some(markedWord => markedWord?.id === word?.id) ? (
                  <WordCard word={word} key={idx} marked={true} side="left" />
                ) : (
                  <WordCard word={word} key={idx} marked={false} side="left" />
                ),
              )
            ) : (
              <l.Empty>검색 결과가 없어요</l.Empty>
            )}
          </l.Words>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
