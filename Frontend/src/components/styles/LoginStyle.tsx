import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-lightgrey);
  ::after {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background: linear-gradient(136deg, transparent 80%, var(--color-orange) 20%);
  }
  .login,
  .signup {
    width: 35vw;
    height: 35vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10%;

    
    .title {
      font-size: 2rem;
      font-style: italic;
      color: var(--color-dark);
      margin: 0;
      margin-bottom: 1%;
    }
    .select-btn {
      height: 3vh;
      width: 70%;
      margin: 3% 0;
      padding: 2%;
      background-color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
    }
    img {
      height: 100%;
      margin-right: 3%;
    }
  }
`

export { Wrapper }
