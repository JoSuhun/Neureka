import styled from "styled-components";

const SlideWrapper = styled.div`
  height: 8vh;
  width: 100%;
  background-color: #040461;
  align-items: center;
  overflow: hidden;
  @keyframes infiniteAnimation1 {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(-100%);
    }
    50.1% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @keyframes infiniteAnimation2 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-200%);
    }
  }
  .slide-container {
    width: 200%;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    .slide-box {
      align-items: center;
      &.original {
        animation: 120s linear infinite normal none running infiniteAnimation1;
      }
      &.clone {
        animation: 120s linear infinite infiniteAnimation2;
      }
    }
  }
`;

const SlideText = styled.div`
  display: inline-block;
  color: white;
  font-family: "SEBANG_Gothic_Bold";
  font-size: 2rem;
  font-style: italic;
  font-weight: 200;
  margin: 0 20px;
`;

export { SlideWrapper, SlideText };
