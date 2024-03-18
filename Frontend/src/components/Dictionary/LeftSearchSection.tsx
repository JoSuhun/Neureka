import React, { useState } from 'react'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'
import SearchInput from '@src/common/SearchInput'

import save from '/image/save.png'
import notsave from '/image/notsave.png'
import WordCard from './WordCard'

type Props = {}

const LeftSearchSection = (props: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useState('')
  const [isSave, SetIsSave] = useState(false)

  const ToggleSave = () => {
    SetIsSave(!isSave)
  }

  const words = Array.from({ length: 10 }, (_, idx) => idx)

  return (
    <>
      <l.Wrapper>
        <l.Box>
          <l.SearchBar>
            <SearchInput
              search={search}
              setSearch={setSearch}
              setQuestion={setQuestion}
            />
          </l.SearchBar>
          <l.SearchResult className={search ? `open` : `close`}>
            <l.SearchTitle>
              {question}
              {isSave ? (
                <l.saveBtn src={save} onClick={ToggleSave} />
              ) : (
                <l.saveBtn src={notsave} onClick={ToggleSave} />
              )}
            </l.SearchTitle>
            <l.SearchContent>
              어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고쩌고저쩌고
              어쩌고저쩌고쩌고저쩌고어쩌고저쩌고쩌고저쩌고어쩌고저쩌고 라는 뜻
            </l.SearchContent>
          </l.SearchResult>
          <l.Words className={search ? 'long' : 'short'}>
            {words.map((it, key) => (
              <WordCard />
            ))}
          </l.Words>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
