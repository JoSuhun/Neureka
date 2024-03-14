import styled from 'styled-components'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-lightgrey);
  padding-bottom: 3%;
  @media screen and (max-width: 1200px) {
    .card-box {
      height: 250px;
    }
    .card-title {
      font-size: 1rem;
    }
    .card-content {
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 992px) {
    .news-box {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
    .news-box {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export const NewsBox = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 40px;
`

export const NewCardBox = styled.div`
  background-color: white;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.048),
    0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  &:hover img {
    transform: scale(1.05);
  }
  &:hover .box {
    opacity: 0.7;
  }
`

export const NewsThumbnailBox = styled.div`
  width: 100%;
  height: 60%;
`

export const NewsThumbnail = styled.img<{ image: string }>`
  background: url(${props => props.image});
  background-size: cover;
  width: 100%;
  height: 100%;
  transition: all 200ms ease-in;
`

export const News = styled.div`
  margin: 5%;
`

export const NewsTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 3%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: var(--color-dark);
`

export const NewsContent = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: var(--color-grey);
`
export const PageStack = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NewsPagination = styled(Pagination)``
