import * as s from '@src/components/styles/Stocks/MainInfoSectionStyle'
import { useEffect, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const MainInfoSection = () => {
  const [price, setPrice] = useState(0)

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    let won = 74000
    setPrice(won)
  }, [])

  return (
    <>
      <s.Container>
        <s.Title>
          삼성전자
          <s.Number>(000000)</s.Number>
        </s.Title>

        <s.Info>
          <s.InfoTable border={1}>
            <s.TableTr>
              <s.TableTd rowSpan={2}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <s.Price>{price.toLocaleString('ko-KR')}</s.Price>
                  전일대비 어쩌구 저쩌구
                </div>
              </s.TableTd>
              <s.TableTd>전일 ㅇㅇㄴ</s.TableTd>
              <s.TableTd>고가 ㄴㄴㄴ</s.TableTd>
              <s.TableTd>거래량 ㄴㄴㄴ</s.TableTd>
            </s.TableTr>
            <s.TableTr>
              <s.TableTd>시가</s.TableTd>
              <s.TableTd>저가</s.TableTd>
              <s.TableTd>거래대금</s.TableTd>
            </s.TableTr>
          </s.InfoTable>
        </s.Info>

        <s.Graph>그ㅡㅡㅡㅡㅡ래ㅐㅐㅐㅐㅐ프ㅡㅡㅡㅡㅡ랍니다</s.Graph>

        <s.NewsTab>
          <s.TabBox>
            <s.InfoTabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <s.InfoTab label="최근뉴스" {...a11yProps(0)} />
              <s.InfoTab label="공시정보" {...a11yProps(1)} />
              <s.InfoTab label="재무제표" {...a11yProps(2)} />
            </s.InfoTabs>
          </s.TabBox>
          <CustomTabPanel value={value} index={0}>
            <s.InfoBox>최근뉴스</s.InfoBox>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <s.InfoBox>공시정보</s.InfoBox>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <s.InfoBox>안녕?</s.InfoBox>
          </CustomTabPanel>
        </s.NewsTab>
      </s.Container>
    </>
  )
}

export default MainInfoSection
