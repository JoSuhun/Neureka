import React, { useState } from 'react'

import * as l from '@src/components/styles/Dictionary/LeftSearchSectionStyle'
import SearchInput from '@src/common/SearchInput'

type Props = {}

const LeftSearchSection = (props: Props) => {
  const [search, setSearch] = useState(false)
  return (
    <>
      <l.Wrapper>
        <l.Box>
          <l.SearchBar>
            <SearchInput search={search} setSearch={setSearch} />
          </l.SearchBar>
          <l.SearchResult className={search ? `open` : `close`}>
            모르겠는데요
            모르겠는데요모르겠는데요모르겠는데요모르겠는데요모르겠는데요모르겠는데요
            모르겠는데요모르겠는데요
          </l.SearchResult>
        </l.Box>
      </l.Wrapper>
    </>
  )
}

export default LeftSearchSection
