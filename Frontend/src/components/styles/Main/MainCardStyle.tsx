import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div<{ bgimage: string }>`
  width: 95%;
  height: 90%;
  border-radius: 30px;

  position: relative;

  display: flex;
  flex-direction: column;
  z-index: 2;
  background-image: url(${props => props.bgimage});
  background-position: center;
  background-size: cover;
  /* justify-content: center; */

  color: white;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &::before {
    position: absolute;
    z-index: 1;
    content: '';
    border-radius: 30px;
    box-shadow: var(--shadow);
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-size: cover;
    background: linear-gradient(70deg, var(--color-dark) 50%, #00000046 50%);
  }

  * {
    z-index: 2;
    font-family: 'Pretendard-Thin';
  }
`

export const Title = styled.div`
  /* background-color: red; */
  margin-left: 3%;
  padding-top: 25%;
  margin-bottom: 20px;
  font-size: 4rem;
  width: 45%;

  &.changed {
    border-bottom: 2px solid white;
  }
`

export const Info = styled.p`
  width: max-content;
  font-size: 1.7rem;
  color: var(--color-lightgrey);
  margin-left: 3%;
  padding: 10px 0;

  opacity: 0;
  transform: translateY(30%);
  transition: all 300ms ease-in-out;

  cursor: pointer;

  &:hover {
    color: var(--color-yellow);
    font-family: 'Pretendard-Regular';
    span {
      opacity: 1;
    }
  }
  &.changed {
    opacity: 1;
    transform: translateY(0%);
  }

  span {
    opacity: 0;
  }
`

export const Cursor = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.05);
  position: fixed;
  border-radius: 50%;
  aspect-ratio: 1;
  z-index: 9;
  width: 60px;
  cursor: none;
`
