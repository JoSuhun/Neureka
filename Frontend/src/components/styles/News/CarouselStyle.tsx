import styled from 'styled-components'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import StopIcon from '@mui/icons-material/Stop'

export const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 992px) {
    .carousel {
      height: 55vh;
    }
    .carousel-item {
      p {
        font-size: 1.7rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .carousel {
      height: 50vh;
    }
    .carousel-item {
      p {
        font-size: 1.5rem;
      }
    }
  }
  @media screen and (max-width: 576px) {
    .carousel {
      height: 40vh;
    }
  }
`

export const Container = styled.div`
  height: 60vh;
  width: 100vw;
`

export const Slides = styled.div`
  z-index: 1;
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
`

export const Slide = styled.div`
  background-color: transparent;
`

export const PrevButton = styled(ArrowLeftIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 5;
  left: 0;
  color: white;
`
export const NextButton = styled(ArrowRightIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 10;
  right: 0;
  color: white;
`

export const IndexBox = styled.div`
  display: flex;
  justify-content: center;
  .focused_card {
    color: var(--color-navy);
  }
`

export const CardIndex = styled(StopIcon)`
  font-size: 1.1rem !important;
  color: var(--color-lightgrey);
`

export const CarouselCard = styled.div<{ bgimage: string }>`
  width: 100dvw;
  height: 100%;
  background-color: #ececec;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  background-position: bottom 10% right;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
  cursor: pointer;

  &::before {
    background-color: #000000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  p {
    z-index: 5;
    padding: 1% 3%;
    margin: 0;
  }
`

export const HeadLine = styled.p`
  background-color: var(--color-orange);
  position: absolute;
  color: white;
  top: 65%;
  left: 0;
  font-size: 2rem;
`
