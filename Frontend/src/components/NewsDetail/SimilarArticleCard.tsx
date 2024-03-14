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
      <c.Wrapper className="card">
        <c.Thumbnail
          src={image ? image : defaultThumbnail}
          className="card-thumbnail"
        />
        <c.Title className="card-title">{title}</c.Title>
        <c.Content className="card-content">{content}</c.Content>
      </c.Wrapper>
    </>
  )
}

export default SimilarArticleCard
