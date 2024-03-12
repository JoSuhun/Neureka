import styled from 'styled-components'

export const Wrapper = styled.div<{ bgimage: string }>`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  justify-content: end;
  padding-bottom: 3%;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: linear-gradient(70deg, var(--color-dark) 50%, #0000008f 50%);
  }
`
export const MainTitle = styled.p`
  margin: 2%;
  font-family: 'Pretendard-Thin';
  /* font-family: 'SEBANG_Gothic_Regular'; */

  color: white;
  position: relative;

  font-size: 5rem;
  /* font-weight: 700; */
`

export const MainTitle1 = styled.span`
  margin-left: 15px;
  color: white;
  position: relative;

  &.original {
    opacity: 0;
  }
`

export const Box = styled.p`
  width: 100%;
  font-family: 'Pretendard-Thin';
  position: relative;
`

export const BoxTitle = styled.div`
  font-style: italic;
  font-size: 2.2rem;
  color: var(--color-grey);
  /* width: 0%; */
  background-image: linear-gradient(
    to right,
    white,
    white 50%,
    var(--color-lightgrey) 50%
  );
  /* background-size: 200% 100%;
  background-position: -100%; */
  display: inline-block;
  margin: 2%;
  position: relative;
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  transition: all 0.3s ease-in-out;
  &::before {
    content: '';
    background: white;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    background-position: 0;
    cursor: pointer;
    color: white;
  }

  &:hover::before {
    width: 120%;
  }
  &.original {
    opacity: 0;
    transform: translateY(-80%);
  }
  transition: all 300ms ease-in-out;
`

export const BoxContent = styled.p`
  position: relative;
  margin-left: 1%;
  font-size: 1.5rem;
  color: var(--color-orange);
  opacity: 0;
  -webkit-transition:
    -webkit-transform 0.3s,
    opacity 0.3s;
  -moz-transition:
    -moz-transform 0.3s,
    opacity 0.3s;
  transition:
    transform 0.3s,
    opacity 0.3s;
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  transform: translateY(-200%);
`
