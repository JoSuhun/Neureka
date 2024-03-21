import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-lightgrey);
  padding: 2% 0;
  border-bottom: 2px solid var(--color-dark);
  top: 13vh;
  /* position: sticky; */
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 2rem;
  font-weight: 600;
`

export const CodeNumber = styled.span`
  color: var(--color-grey);
  font-size: 1rem;
  margin-left: 10px;
  align-self: flex-end;
`

export const AddButton = styled(AddCircleIcon)`
  color: #ffc700;
  font-size: 1.5rem !important;
  margin-left: auto;
  align-self: flex-end;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
