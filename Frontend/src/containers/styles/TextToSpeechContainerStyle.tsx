import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: auto;
`

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 10%;
`

export const Setting = styled.div`
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 5%;
  }
`
