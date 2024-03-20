import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'

export const InfoBox = styled.div`
  padding-left: 10%;
  margin: 20px 0;
  height: 70%;
  font-size: 1.3rem;
`
export const CategoryBox = styled.div``
export const Category = styled.p`
  padding-top: 30px;
  display: flex;
  align-items: center;
`
export const Title = styled.p`
  display: inline-block;
  width: 20%;
`
export const Content = styled.input`
  /* color: grey; */
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
  }
  &:focus-visible {
    border: 2px dashed var(--color-blue);
    border-radius: 3px;
    outline: none;
  }
`

export const EditBtn = styled(EditIcon)`
  font-size: 1.2rem !important;
  color: var(--color-grey);
`
