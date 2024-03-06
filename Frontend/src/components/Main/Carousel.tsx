import React, { useState, useEffect } from 'react'
import * as c from '../styles/Main/CarouselStyle'
import CarouselItem from './CarouselItem'

const Carousel = () => {
  const [counter, setCounter] = useState(0)
  const cards = ['1', '2', '3']
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

  // 캐러셀 4초마다 넘김
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter =>
        prevCounter === cards.length - 1 ? 0 : prevCounter + 1,
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [cards.length])

  return (
    <c.Wrapper>
      <c.Container>
        <c.PrevButton onClick={handlePrev} />
        <c.Slides style={{ transform: `translateX(${-100 * counter}%)` }}>
          {cards.map((card, index) => (
            <c.Slide key={index}>
              <CarouselItem type={card} />
            </c.Slide>
          ))}
        </c.Slides>
        <c.NextButton onClick={handleNext} />
      </c.Container>

      <c.IndexBox>
        {cards.map((card, index) => (
          <c.CardIndex className={index === counter ? 'focused_card' : ''} />
        ))}
      </c.IndexBox>
    </c.Wrapper>
  )
}

export default Carousel
