import styled from 'styled-components'

export const CarouselWrapper = styled.div`
  width: 100%;
  /* margin: auto; */
  display: flex;
  justify-content: center;

  .swiper-button-next,
  .swiper-button-prev {
    color: #000;
  }

  .swiper-slide {
    /* width: 100px !important; */
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease; // 변환(확대) 애니메이션
    &:hover {
      transform: scale(1.2); // 마우스 호버 시 아이콘 확대
    }
  }
  .swiper-horizontal {
    width: 100%;
  }
`

export const Icon = styled.img`
  width: 75px;
  height: 75px;
`

export const Category = styled.div`
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 20px;
`
