import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ClearIcon from '@mui/icons-material/Clear'

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

export const GoMoreBtn = styled.span`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 20px;
  position: fixed;
  z-index: 1;
  right: 0%;
  bottom: 5%;
  background-color: var(--color-grey);

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);

  &:hover {
    cursor: pointer;
  }
`

export const SelectBox = styled.div`
  background-color: var(--color-grey);
  position: fixed;
  z-index: 0;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  bottom: 5%;
  right: 0%;
  width: 200px;
  height: 100px;
  transform: translateX(100%);
  transition: transform 500ms ease-in-out;
  &.show {
    transform: translateX(0%);
  }
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`
export const Select = styled.p`
  color: white;
  border-radius: 10px;
  padding: 5px;
  margin-left: 20px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }

  cursor: pointer;
  transform: translateY(0);
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: translateY(-5%);
  }
`

export const More = styled(MoreHorizIcon)`
  color: var(--color-lightblue);
  font-size: 2rem !important;
`

export const Back = styled(ArrowForwardIosIcon)`
  color: var(--color-lightblue);
  font-size: 1rem !important;
`

export const Clear = styled(ClearIcon)`
  color: var(--color-lightblue);
  font-size: 2rem !important;
`

export const Search = styled(SearchIcon)`
  color: var(--color-lightblue);
  font-size: 2.3rem !important;
`

export const SearchSection = styled.div`
  position: fixed;
  width: 25vw;
  top: 55%;
  right: 0%;
  transform: translate(100%, -50%);
  transition: transform 400ms ease-in-out;
  > div {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    opacity: 0.9;
  }
  &.show {
    transform: translate(0%, -50%);
  }
`

export const TTSSection = styled.div`
  position: fixed;
  width: 25vw;
  top: 55%;
  right: 0%;
  transform: translate(100%, -50%);
  transition: transform 400ms ease-in-out;
  &.show {
    transform: translate(0%, -50%);
  }
`
