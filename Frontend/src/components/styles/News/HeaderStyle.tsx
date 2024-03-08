import { StyledEngineProvider } from '@mui/material'
import styled from 'styled-components'

import SearchIcon from '@mui/icons-material/Search'

export const Wrapper = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1% 0%;
`

export const SearchBox = styled.div`
  width: 65%;
  height: 100%;
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
  font-size: 1rem;
  &:focus {
    outline: none;
    border-bottom: 2px solid var(--color-blue);
  }
  &:hover {
    border-bottom: 2px solid var(--color-blue);
  }
`

export const SearchButton = styled(SearchIcon)`
  /* background-color: var(--color-blue); */
  border-radius: 10px;
  font-size: 1.5em !important;
  aspect-ratio: 1;
  height: 1.3em !important;
  width: 1.3em !important;
  padding: 1%;
  color: var(--color-dark);
  cursor: pointer;
`

export const HotKeyword = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`

export const KeywordTitle = styled.p`
  color: var(--color-blue);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 10px;
`

export const SelectBox = styled.div`
  position: relative;
  width: 90%;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    top: 1px;
    right: 8px;
    color: var(--color-blue);
    font-size: 20px;
  }
  &:hover ul {
    max-height: min-content;
  }
`
export const Label = styled.label`
  font-size: 1rem;
  margin-left: 3%;
  text-align: center;
  position: relative;
  display: flex;
`
export const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: auto;
  max-height: 0;
  padding: 0;
  border-radius: 8px;
  background-color: var(--color-lightgrey);
`
export const OptionNum = styled.span`
  background-color: var(--color-blue);
  text-align: center;
  color: white;
  height: 100%;
  width: 20px;
  border-radius: 5px;
  margin-right: 5%;
`

export const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  display: flex;
  margin-left: 3%;

  &:hover {
    background-color: var(--color-navy);
    color: white;
  }
`
