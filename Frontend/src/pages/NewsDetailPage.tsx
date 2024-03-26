import NewsDetailContainer from '@src/containers/NewsDetailContainer'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const NewsDetailPage = ({}: Props) => {
  const { url } = useParams()

  return (
    <>
      <NewsDetailContainer newsUrl={url as string} />
    </>
  )
}

export default NewsDetailPage
