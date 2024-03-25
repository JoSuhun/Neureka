import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'

import * as n from '../styles/News/NewsListStyle'
import NewsCard from './NewsCard'
// import Pagination from './Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { NewsSummary } from '@src/types/NewsType'

type Props = {
  newsData: NewsSummary[]
}

const NewsList = ({ newsData }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const [page, setPage] = useState(1)
  const [data, setData] = useState(newsData)

  const last = Math.ceil(newsData.length / 15)

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  useEffect(() => {
    if (page === last) {
      setData(newsData.slice(15 * (page - 1)))
    } else {
      setData(newsData.slice(15 * (page - 1), 15 * page))
    }
    if (boxRef.current) {
      boxRef.current.scrollIntoView()
    }
  }, [page])

  return (
    <>
      <n.Wrapper ref={boxRef}>
        <n.NewsBox className="news-box">
          {data.map((news, idx) => (
            <NewsCard news={news} />
          ))}
        </n.NewsBox>
        <n.PageStack>
          <n.NewsPagination
            count={last}
            onChange={handlePage}
            variant="outlined"
            color="primary"
          />
        </n.PageStack>
      </n.Wrapper>
    </>
  )
}

export default NewsList
