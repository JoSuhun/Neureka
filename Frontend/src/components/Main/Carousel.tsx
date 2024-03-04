import React, { useState, useEffect } from 'react'
import {
  Wrapper,
  Container,
  Slides,
  Slide,
  PrevButton,
  NextButton,
  IndexBox,
  CardIndex,
} from "../styles/CarouselStyle"
import CarouselItem from './CarouselItem'

function Carousel() {
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
    <Wrapper>
      <Container>
        <PrevButton onClick={handlePrev} />
        <Slides style={{ transform: `translateX(${-100 * counter}%)` }}>
          {cards.map((card, index) => (
            <Slide key={index}>
              <CarouselItem type={card} />
            </Slide>
          ))}
        </Slides>
        <NextButton onClick={handleNext} />
      </Container>

      <IndexBox>
        {cards.map((image, index) => (
          <CardIndex className={index === counter ? 'focused_card' : ''} />
        ))}
      </IndexBox>
    </Wrapper>
  )
}

export default Carousel
