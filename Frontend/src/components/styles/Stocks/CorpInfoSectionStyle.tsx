import styled from 'styled-components'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`

export const Title = styled.div`
  height: 3vh;
  font-size: 1rem;
  font-weight: bold;
`

export const NewsTab = styled.div``

export const TabBox = styled.div``

export const InfoTabs = styled(Tabs)`
  width: 100%;
  border-bottom: 1px solid var(--color-grey);
  button {
    width: 33.3333%;
  }
`

export const InfoTab = styled(Tab)`
  background-color: blue;
`

export const InfoBox = styled.div`
  background-color: beige;
  width: 100%;
  height: 50vh;
`
