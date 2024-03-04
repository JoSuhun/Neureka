import React, { useEffect, useState } from "react";

import { CarouselCard } from "../styles/CarouselStyle"

import bgimage from "../../../public/image/bg-image.jpg";
import bgimage2 from "../../../public/image/bg-image2.jpg";
import bgimage3 from "../../../public/image/bg-image3.jpg";

type Props = {
  type: string;
};

const CarouselItem = ({ type }: Props) => {
  return (
    <>
      {type === "1" ? (
        <CarouselCard bgimage={bgimage}>
          <p className="card1-title">KEYWORDS</p>
          <p className="card1-content">키워드로 추천받는 오늘의 뉴스</p>
        </CarouselCard>
      ) : type === "2" ? (
        <CarouselCard bgimage={bgimage2}>
          <p className="card2-title">MY STOCK</p>
          <p className="card2-content">관심 종목의 실시간 뉴스와 시세를 한눈에 확인하세요</p>
        </CarouselCard>
      ) : (
        <CarouselCard bgimage={bgimage3}>
          <p className="card3-title">NEWS HUB</p>
          <p className="card3-content">최신 뉴스와 인기 뉴스를 확인해보세요</p>
        </CarouselCard>
      )}
    </>
  );
};

export default CarouselItem;
