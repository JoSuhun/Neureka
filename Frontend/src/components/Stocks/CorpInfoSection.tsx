import { useState } from 'react'
import * as s from '@src/components/styles/Stocks/CorpInfoSectionStyle'

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

const CorpInfoSection = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <s.Container>
      <s.Title>기업 정보</s.Title>
      <s.NewsTab>
        <s.TabBox>
          <s.InfoTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <s.InfoTab label="공시정보" {...a11yProps(0)} />
            <s.InfoTab label="재무제표" {...a11yProps(1)} />
          </s.InfoTabs>
        </s.TabBox>
        <CustomTabPanel value={value} index={0}>
          <s.InfoBox>공시정보</s.InfoBox>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <s.InfoBox>재무제표</s.InfoBox>
        </CustomTabPanel>
      </s.NewsTab>
    </s.Container>
  )
}

export default CorpInfoSection
