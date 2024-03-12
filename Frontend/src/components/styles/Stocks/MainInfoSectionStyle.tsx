import styled from 'styled-components'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const Container = styled.div`
  background-color: var(--color-lightgrey);
  flex: 3;
  min-height: 100vh;
  padding: 0 2%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-lightgrey);
  padding: 2% 0;
  border-bottom: 2px solid var(--color-dark);
  top: 13vh;
  position: sticky;
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 2rem;
  font-weight: 600;
`

export const CodeNumber = styled.span`
  font-size: 1rem;
  color: var(--color-grey);
  margin-left: 10px;
  align-self: flex-end;
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
