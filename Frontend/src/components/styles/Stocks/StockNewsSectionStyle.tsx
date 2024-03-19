import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Item = styled.div`
  display: flex;
  gap: 1rem;
`

export const ItemBox = styled.div`
  flex: 1;
`

export const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`

export const ItemContent = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`

export const ItemImage = styled.img`
  width: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
