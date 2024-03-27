import React, { useState, useEffect } from 'react'
import * as c from '../styles/News/CarouselStyle'
import CarouselItem from './CarouselItem'
import { HotNews } from '@src/types/NewsType'

type Props = {
  hotNewsData: HotNews[]
}
const Carousel = ({ hotNewsData }: Props) => {
  const [counter, setCounter] = useState(0)
  const cards = new Array(5).fill(0)
  const handleNext = () => {
    if (counter >= cards.length - 1) {
      setCounter(0)
    } else {
      setCounter(counter + 1)
    }
  }

  const handlePrev = () => {
    if (counter <= 0) {
      setCounter(cards.length - 1)
    } else {
      setCounter(counter - 1)
    }
  }

  // 캐러셀 3초마다 넘김
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter =>
        prevCounter === cards.length - 1 ? 0 : prevCounter + 1,
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [cards.length])

  return (
    <c.Wrapper>
      <c.PrevButton onClick={handlePrev} />
      <c.Container className="carousel">
        <c.Slides style={{ transform: `translateX(${-100 * counter}%)` }}>
          {hotNewsData.map((news, index) => (
            <c.Slide key={index}>
              <CarouselItem news={news} />
            </c.Slide>
          ))}
        </c.Slides>
      </c.Container>
      <c.NextButton onClick={handleNext} />

      <c.IndexBox>
        {cards.map((card, index) => (
          <c.CardIndex
            key={index}
            className={index === counter ? 'focused_card' : ''}
          />
        ))}
      </c.IndexBox>
    </c.Wrapper>
  )
}

export default Carousel
