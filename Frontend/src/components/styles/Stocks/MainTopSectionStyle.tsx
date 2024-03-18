import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-lightgrey);
  padding: 2% 0;
  border-bottom: 2px solid var(--color-dark);
  top: 13vh;
  /* position: sticky; */
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 2rem;
  font-weight: 600;
`

export const CodeNumber = styled.span`
  color: var(--color-grey);
  font-size: 1rem;
  margin-left: 10px;
  align-self: flex-end;
`
