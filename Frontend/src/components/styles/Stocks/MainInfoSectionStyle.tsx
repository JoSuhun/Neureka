import styled from 'styled-components'

export const Container = styled.div`
  background-color: var(--color-lightgrey);
  flex: 3;
  min-height: 100vh;
  padding: 0 2%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
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

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vh;
  margin-top: 2%;
`
