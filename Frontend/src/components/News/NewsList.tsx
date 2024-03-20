import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'

import * as n from '../styles/News/NewsListStyle'
import NewsCard from './NewsCard'
// import Pagination from './Pagination'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type Props = {}

const NewsList = (props: Props) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const news = Array.from({ length: 50 }, (_, idx) => idx)

  const [page, setPage] = useState(1)
  const [data, setData] = useState(news)

  const last = Math.ceil(news.length / 15)

  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  // 뉴스 조회 api
  useEffect(() => {
    // axios
    //   .get('http://127.0.0.1:8000/news/api/today/')
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (page === last) {
      setData(news.slice(15 * (page - 1)))
    } else {
      setData(news.slice(15 * (page - 1), 15 * page))
    }
    if (boxRef.current) {
      boxRef.current.scrollIntoView()
    }
  }, [page])

  return (
    <>
      <n.Wrapper ref={boxRef}>
        <n.NewsBox className="news-box">
          {data.map((it, idx) => (
            <NewsCard />
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
