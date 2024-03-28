import NewsDetailContainer from '@src/containers/NewsDetailContainer'
import TokenChecker from '@src/utils/TokenChecker'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const NewsDetailPage = ({}: Props) => {
  const { url } = useParams()

  return (
    <>
      <TokenChecker />
      <NewsDetailContainer newsUrl={url as string} />
    </>
  )
}

export default NewsDetailPage
