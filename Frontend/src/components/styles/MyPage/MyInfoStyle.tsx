import styled from 'styled-components'

export const InfoBox = styled.div`
  padding-left: 10%;
  margin: 20px 0;
  height: 70%;
  font-size: 1.2rem;
  position: relative;
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
  font-size: 1.1rem;
  border-bottom: 1.5px solid transparent;
  &.edit {
    border-bottom: 1.5px solid var(--color-blue);
    &:hover {
      cursor: pointer;
    }
  }
  &:focus-visible {
    border: 2px dashed var(--color-blue);
    border-radius: 3px;
    outline: none;
  }
`

export const Btn = styled.div`
  border-radius: 5px;
  padding: 7px;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-grey);
  &:hover {
    svg {
      color: var(--color-blue);
    }
    &.edit {
      svg {
        color: var(--color-orange);
      }
    }
  }

  span {
    font-size: 1.1rem;
    color: var(--color-dark);
  }
  svg {
    margin-left: 5px;
    color: var(--color-dark);
  }

  position: absolute;
  right: 0;
  cursor: pointer;
`
export const GenderLabel = styled.label`
  font-size: 1.1rem;
  &.female {
    margin-left: 35px;
  }
  input {
    margin-left: 10px;
  }
`
