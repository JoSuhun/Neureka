import styled from 'styled-components'

export const LoginTitle = styled.p`
  font-size: 1.2rem;
`

export const Logincontent = styled.div`
  width: 70%;
  margin: 5% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LoginSelect = styled.p`
  width: 90%;
  height: 25px;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
  margin-bottom: 10px;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid transparent;

  &.kakao {
    background-color: #ffe75d;
  }
  &.google {
    background-color: #c3e8ff;
  }
`

export const LoginMsg = styled.span`
  font-size: 0.8rem;
  color: var(--color-dark);
`

export const LoginIcon = styled.img`
  height: 100%;
  margin-right: 3%;
  justify-self: start;
  position: absolute;
  left: 10px;
  height: 20px;
`
