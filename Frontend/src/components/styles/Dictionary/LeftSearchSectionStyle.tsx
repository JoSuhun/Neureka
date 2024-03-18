import styled from 'styled-components'

import SearchIcon from '@mui/icons-material/Search'

export const Wrapper = styled.div`
  background-color: var(--color-lightblue);
  width: 50%;
  min-height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Box = styled.div`
  /* background-color: red; */
  width: 80%;
  height: 100%;
  margin: 20px;
`

export const SearchBar = styled.div`
  width: 100%;
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

export const SearchResult = styled.div`
  background-color: var(--color-lightgrey);
  width: 90%;
  height: 0;
  opacity: 0;
  padding: 10px 5%;
  transition: all 500ms ease-in-out;

  line-height: 1.7;
  color: var(--color-navy);

  box-shadow: var(--shadow);
  &.open {
    height: 30vh;
    transition: all 500ms ease-in-out;
    opacity: 1;
  }
`
