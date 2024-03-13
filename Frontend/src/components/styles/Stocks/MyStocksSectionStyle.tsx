import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Favorite = styled.div`
  border-top: 1px solid var(--color-blue);
  width: 90%;
  height: 50%;
`
export const Latest = styled.div`
  border-top: 1px solid var(--color-blue);
  width: 90%;
  height: 50%;
`
export const Title = styled.p`
  font-size: 1rem;
  font-weight: 700;
  padding: 5px 0;
  color: var(--color-dark);
`
export const Content = styled.div`
  background-color: #ffffffc0;
  width: 90%;
  height: 60%;
  margin: 5px 0;
  padding: 5%;
  border-radius: 20px;
  box-shadow: inset 0.5px 0.5px 2px 0.5px #e2e2e2;
`
