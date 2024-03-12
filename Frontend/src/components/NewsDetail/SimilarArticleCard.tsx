import React from 'react'

import * as c from '@src/components/styles/NewsDetail/SimilarArticleCardStyle'

import defaultThumbnail from '/image/ky.gif'

type Props = {
  image: string | null
  title: string
  content: string
}

const SimilarArticleCard = ({ image, title, content }: Props) => {
  return (
    <>
      <c.Wrapper>
        <c.Thumbnail src={image ? image : defaultThumbnail} />
        <c.Title>{title}</c.Title>
        <c.Content>{content}</c.Content>
      </c.Wrapper>
    </>
  )
}

export default SimilarArticleCard
