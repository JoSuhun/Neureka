import styled from 'styled-components'

const NavbarBody = styled.div`
  margin: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 13vh;
  overflow: hidden;
  .nav {
    font-family: 'Giants-Inline';
    height: 13vh;
    transition-duration: 300ms;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    z-index: 5;
    .title {
      font-weight: 700;
      font-size: 2.4rem;
      letter-spacing: 0.2rem;
    }
    .button-section {
      position: absolute;
      right: 5%;
      display: flex;
      justify-content: space-between;
      button {
        font-family: 'SEBANG_Gothic_Bold';
        cursor: pointer;
        font-size: 120%;
        text-align: center;
        align-items: center;
        background-color: var(--color-orange);
        color: white;
        border: none;
        border-radius: 10px;
        width: 100px;
        height: 5vh;
      }
      .login-btn {
        background-color: var(--color-navy);
        margin-right: 5%;
      }
      :nth-child(1) {
      }
    }
  }
  .original {
    background-color: #ffffff76;
  }
  .change {
    background-color: #ffffff;
  }
  .navbar-container {
    width: 40%;
    height: 100vh;
    background-color: #ecececdb;
    position: fixed;
    right: 0;
    transition: transform 0.5s ease;
  }
  .open {
    transform: translateY(0);
  }
  .close {
    transform: translateY(-100%);
  }

  .nav-selector {
    color: navy;
    p {
      cursor: pointer;
      margin: 10% 5%;
      padding-left: 3%;
      font-size: 1.5rem;
      font-weight: 200;
      font-family: 'Noto Sans KR', sans-serif;
      &:hover {
        color: white;
        background-color: #ff7530;
      }
    }
  }
  @media screen and (max-width: 992px) {
    .nav {
      .button-section {
        flex-direction: column;
        button {
          width: 100px;
          height: 4vh;
        }
        .login-btn {
          margin-bottom: 3%;
        }
      }
    }
    .nav-selector {
      p {
        font-size: 1.4rem;
      }
    }
    .navbar-container {
      width: 40%;
    }
  }
  @media screen and (max-width: 768px) {
    .nav-selector {
      p {
        font-size: 1.3rem;
      }
    }
    .navbar-container {
      width: 45%;
    }
  }
  @media screen and (max-width: 576px) {
    .nav {
      .button-section {
        button {
          width: 80px;
          height: 4vh;
          font-size: 100%;
        }
        .login-btn {
          margin-bottom: 3%;
        }
      }
    }
    .navbar-container {
      width: 50%;
    }
  }
`

export default NavbarBody
