import React, { useState } from 'react'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'
import SearchInput from '@src/common/SearchInput'

type Props = {}

const LeftSearchSection = (props: Props) => {
  const [search, setSearch] = useState(false)
  const [question, setQuestion] = useState('')
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
            {question}
            어쩌고저쩌고
          </l.SearchResult>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
