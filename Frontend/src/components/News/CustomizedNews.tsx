import React from 'react'

import * as c from '../styles/News/CustomizedNewsStyle'
import CustomizedNewsItem from './CustomizedNewsItem'

type Props = {}

const CustomizedNews = (props: Props) => {
  return (
    <>
      <c.Wrapper>
        <c.Title>
          <p>승현이를 위한 뉴스</p>
        </c.Title>
        <c.NewsBox>
          <CustomizedNewsItem />
          <CustomizedNewsItem />
        </c.NewsBox>
      </c.Wrapper>
    </>
  )
}

export default CustomizedNews
