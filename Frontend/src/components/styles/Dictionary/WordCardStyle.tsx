import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear'

export const Card = styled.div`
  border-radius: 10px;
  /* width: 90%; */
  min-height: 20vh;
  margin: 15px 10px;
  background-color: var(--color-lightgrey);
  box-shadow: var(--shadow);
`

export const CardBox = styled.div`
  padding: 20px;
  position: relative;
`

export const Title = styled.p`
  font-family: 'Galmuri11', sans-serif;
  color: var(--color-dark);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  .highlight {
    box-shadow: inset 0 -20px 0 #bfffa1;
  }
`

export const Content = styled.div`
  color: var(--color-grey);
  padding-top: 10px;
  font-size: 1.05rem;
  line-height: 1.4;
  .highlight {
    color: black;
    font-weight: 700;
  }
`
export const saveBtn = styled.img`
  width: 30px;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    transform: rotate(10deg);
  }
`
export const deleteBtn = styled(ClearIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--color-grey);
  cursor: pointer;
`
