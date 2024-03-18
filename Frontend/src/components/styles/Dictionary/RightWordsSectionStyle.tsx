import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #e6ebff;
  border-left: 2px dashed var(--color-blue);
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`

export const Title = styled.p`
  font-family: 'Pretendard-Thin';
  color: var(--color-navy);
  margin-top: 25px;
  margin-bottom: 10px;
  margin-left: 20px;
  padding-bottom: 5px;
  width: 80%;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--color-dark);
`

export const Box = styled.div`
  align-self: center;
  width: 80%;
  height: 100%;
  overflow-y: scroll;
  /* padding: 15px; */
`
export const WordContainer = styled.div`
  height: 100%;
  margin: 5%;
`
