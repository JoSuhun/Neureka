import styled from 'styled-components'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Container = styled.div`
  background-color: var(--color-lightgrey);
  flex: 3;
  min-height: 100vh;
  padding: 0 2%;
  padding-bottom: 5%;
`
export const Title = styled.p`
  color: var(--color-dark);
  background-color: var(--color-lightgrey);
  font-size: 2rem;
  font-weight: 700;
  padding: 2% 0;
  border-bottom: 2px solid var(--color-dark);
  top: 13vh;
  position: sticky;
`
export const Number = styled.span`
  font-size: 1rem;
  color: var(--color-grey);
  margin: 0 10px;
`
export const Info = styled.div`
  background-color: white;
  height: 15vh;
`
export const InfoTable = styled.table`
  width: 100%;
  height: 100%;
`
export const TableTd = styled.td`
  padding: 10px;
`

export const Price = styled.span`
  color: var(--color-blue);
  font-size: 1.7rem;
  font-weight: 700;
`
export const TableTr = styled.tr``

export const Graph = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 60vh;
  background-color: lightskyblue;
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
