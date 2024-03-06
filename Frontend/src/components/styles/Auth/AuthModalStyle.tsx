import styled from 'styled-components'
import { Box } from '@mui/material'

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  width: 40%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ModalTitle = styled.p`
  font-family: 'SEBANG_Gothic_Regular';
  font-size: 2.5rem;
`

export const Modalcontent = styled.div`
  width: 70%;
  margin-top: 5%;
`

export const LoginSelect = styled.p`
  width: 100%;
  height: 30px;
  background-color: white;
  color: var(--color-dark);
  display: flex;
  align-items: center;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
`

export const LoginIcon = styled.img`
  height: 100%;
  margin-right: 3%;
`
