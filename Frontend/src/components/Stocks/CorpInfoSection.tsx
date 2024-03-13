import { useState } from 'react'
import * as c from '@src/components/styles/Stocks/CorpInfoSectionStyle'

const CorpInfoSection = () => {
  const [currentTab, setcurrentTab] = useState(0)

  const TabArr = [
    { name: '재무제표', content: 'Tab menu ONE' },
    { name: '공시정보', content: 'Tab menu TWO' },
  ]

  const selectMenuHandler = (index: number) => {
    setcurrentTab(index)
  }

  return (
    <c.Container>
      <c.Title>기업 정보</c.Title>
      <c.Wrap>
        <c.Tabs>
          {TabArr.map((el, index) => (
            <li
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </c.Tabs>
        <c.Content>{TabArr[currentTab].content}</c.Content>
      </c.Wrap>
    </c.Container>
  )
}

export default CorpInfoSection
