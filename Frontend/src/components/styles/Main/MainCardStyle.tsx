import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 75vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Card = styled.div<{ bgimage: string }>`
  height: 100%;
  width: 94%;
  margin: 3% 0;
  background: url(${props => props.bgimage});
  background-size: cover;
  border-radius: 20px;
`
