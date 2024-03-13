import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 3%;
  margin-top: 30px;
  width: 80%;
  display: flex;
  flex-direction: column;
`
export const Title = styled.div`
  width: 100%;
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 10px;
`
export const Date = styled.div`
  color: var(--color-grey);
  margin-left: 10px;
`
export const Image = styled.img`
  width: 70%;
  aspect-ratio: 2;
  align-self: center;
  margin: 30px 0;
  object-fit: cover;
`
export const Content = styled.article`
  margin: 3% 0;
  padding: 0 30px;
  /* background-color: orange; */
  line-height: 2.2;
  font-size: 1.1rem;
  white-space: pre-wrap;
`
