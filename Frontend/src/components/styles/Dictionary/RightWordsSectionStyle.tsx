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
export const Box = styled.div`
  width: 80%;
  height: 100%;
  margin: 20px;
  overflow-y: scroll;
  /* padding: 15px; */
`
export const WordContainer = styled.div`
  height: 100%;
  margin: 5%;
`
