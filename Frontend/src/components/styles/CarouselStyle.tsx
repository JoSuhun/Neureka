import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StopIcon from "@mui/icons-material/Stop";

const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  height: 60vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
`;

const Slides = styled.div`
  z-index: 1;
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
`;

const Slide = styled.div`
  background-color: transparent;
`;

const PrevButton = styled(ArrowLeftIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 5;
  left: 0;
  color: white;
`;
const NextButton = styled(ArrowRightIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 10;
  right: 1%;
  color: white;
`;

const IndexBox = styled.div`
  display: flex;
  justify-content: center;
  .focused_card {
    color: blue;
  }
`;

const CardIndex = styled(StopIcon)`
  font-size: 1.1rem !important;
  color: #ececec;
`;

const CarouselCard = styled.div<{ bgimage: string }>`
  width: 100dvw;
  height: 100%;
  background-color: #ececec;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: bottom 10% right;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
  &::before {
    background-color: #000000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  p {
    position: absolute;
    z-index: 5;
    font-family: "SEBANG_Gothic_Bold";
    color: white;
    padding: 1% 3%;
    margin: 0;
  }
  .card1-title {
    background-color: #ff7700;
    top: 40%;
    left: 0;
    font-size: 2rem;
  }
  .card1-content {
    background-color: #ffffff;
    color: #040082;
    top: 60%;
    left: 0;
    font-size: 1.5rem;
  }
  .card2-title {
    background-color: #ffb700;
    top: 50%;
    left: 3%;
    font-size: 2rem;
  }
  .card2-content {
    top: 65%;
    left: 0;
    font-size: 1.5rem;
  }
  .card3-title {
    background-color: #00233b;
    text-align: center;
    /* left: 40%; */
    /* top: 30%; */
    font-size: 2.2rem;
    position: relative;
    width: 15vw;
    height: 10%;
  }
  .card3-content {
    font-size: 1.5rem;
    position: relative;
  }
`;

export {
  Wrapper,
  Container,
  Slides,
  Slide,
  PrevButton,
  NextButton,
  IndexBox,
  CardIndex,
  CarouselCard,
};
