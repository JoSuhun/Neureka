import styled from 'styled-components'

export const Card = styled.div`
  border-radius: 10px;
  /* width: 90%; */
  min-height: 20vh;
  margin: 15px 10px;
  background-color: var(--color-lightgrey);
  box-shadow: var(--shadow);
`

export const CardBox = styled.div`
  padding: 20px;
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 1.2rem;
`

export const Content = styled.div`
  font-family: 'Pretendard-Thin';
  color: var(--color-dark);
  padding-top: 10px;
`
