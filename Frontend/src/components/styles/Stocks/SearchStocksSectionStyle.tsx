import styled from 'styled-components'

export const Container = styled.div`
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  margin: 3%;
  padding: 3%;

  > * {
    margin-bottom: 5%;
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const SelectBox = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
  font-size: 0.8rem;

  & > span:first-child {
    flex: 1;
    margin-right: 5px;
  }

  & > span:last-child {
    margin-left: 5px;
  }
`
