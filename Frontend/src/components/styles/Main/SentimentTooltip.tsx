import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
`

export const Sentiment = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
`
