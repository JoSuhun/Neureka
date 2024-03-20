import styled from 'styled-components'

import SearchIcon from '@mui/icons-material/Search'

export const Wrapper = styled.div`
  background-color: var(--color-lightblue);
  width: 50%;
  height: 80vh;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 992px) {
    width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 30px;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
  }
`

export const Box = styled.div`
  width: 80%;
  height: 100%;
  margin: 20px;
`

export const SearchBar = styled.div`
  width: 100%;
  height: 5%;
  input {
    &:focus {
      outline: none;
      border-bottom: 2px solid var(--color-blue);
    }
    &:hover {
      border-bottom: 2px solid var(--color-blue);
    }
  }
`

export const Words = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  height: 80%;
`
