import styled from 'styled-components'

import SearchIcon from '@mui/icons-material/Search'

export const Wrapper = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const SearchBox = styled.div`
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SearchBar = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0 3%;
  border-radius: 10px;
  box-shadow: inset 0.5px 0.5px 2px 0.5px #e2e2e2;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 90%;
  border: none;
  background-color: transparent;
  font-size: 0%.8;
  &:focus {
    outline: none;
    border-bottom: 2px solid var(--color-blue);
  }
  &:hover {
    border-bottom: 2px solid var(--color-blue);
  }
`

export const SearchButton = styled(SearchIcon)`
  border-radius: 10px;
  font-size: 1.2em !important;
  aspect-ratio: 1;
  height: 1.3em !important;
  width: 1.3em !important;
  padding: 1%;
  color: var(--color-dark);
  cursor: pointer;
`
