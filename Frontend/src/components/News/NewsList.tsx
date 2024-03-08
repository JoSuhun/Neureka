import React, { useEffect, useState } from 'react'

import * as n from '../styles/News/NewsListStyle'
import NewsCard from './NewsCard'
// import Pagination from './Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type Props = {}

const NewsList = (props: Props) => {
  const news = Array.from({ length: 50 }, (_, idx) => idx)

  const [page, setPage] = useState(1)
  const [data, setData] = useState(news)

  const last = Math.ceil(news.length / 15)

  const handlePage = (event: any) => {
    const nowPage = parseInt(event.target.outerText)
    setPage(nowPage)
  }

  useEffect(() => {
    if (page === last) {
      setData(news.slice(15 * (page - 1)))
    } else {
      setData(news.slice(15 * (page - 1), 15 * page))
    }
  }, [page])

  return (
    <>
      <n.Wrapper>
        <n.NewsBox>
          {data.map((it, idx) => (
            <NewsCard />
          ))}
        </n.NewsBox>
        <n.PageStack>
          <n.NewsPagination
            count={last}
            onChange={e => handlePage(e)}
            variant="outlined"
            color="primary"
          />
        </n.PageStack>
      </n.Wrapper>
    </>
  )
}

export default NewsList
