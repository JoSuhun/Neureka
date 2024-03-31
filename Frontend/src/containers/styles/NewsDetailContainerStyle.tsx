import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'

export const HeaderImage = styled.div<{ bgimage: string }>`
  height: 60vh;
  background-image: url(${props => props.bgimage});
  background-size: cover;
`

export const Container = styled.div`
  margin: 0 10%;
  background-color: var(--color-lightgrey);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PlusBtn = styled.span`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 20px;
  position: fixed;
  right: 3%;
  bottom: 5%;
  background-color: var(--color-grey);
`

export const GoDictionaryBtn = styled.span`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 20px;
  position: fixed;
  right: 3%;
  bottom: 5%;
  background-color: var(--color-grey);

  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(0);
  transition: transform 250ms ease-in-out;
  box-shadow: var(--shadow);

  &:hover {
    transform: translateY(-5%);
    cursor: pointer;
  }
`

export const Search = styled(SearchIcon)`
  color: var(--color-lightblue);
  font-size: 2.3rem !important;
`

export const SearchSection = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(100%, -50%);
  transition: transform 1s ease-in-out;
  > div {
    width: 50%;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0.9;
  }
  &.show {
    transform: translate(50%, -50%);
  }
`
