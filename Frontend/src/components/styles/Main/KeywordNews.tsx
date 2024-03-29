import styled from 'styled-components'

export const container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const KeywordTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  margin: 50px 0;
  color: #110079;
`

export const KeywordCircle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`
export const SelectedKeyword = styled.div`
  position: absolute;
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  background-color: #b5c9f0;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 2vw;
`

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  .odd {
    grid-column: 2 / 5;
  }
  .even {
    grid-column: 7 / 10;
  }
  @media (max-width: 1400px) {
    .odd {
      grid-column: 1 / 5;
    }
    .even {
      grid-column: 7 / 11;
    }
  }
`
