import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin-top: 5%;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Item = styled.div`
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const ItemBox = styled.div`
  flex: 1;
`

export const ItemInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`

export const ItemPublisher = styled.div`
  font-size: 0.7rem;
  color: #00aaff;
`

export const ItemDate = styled.div`
  font-size: 0.7rem;
  color: #888;
`

export const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.3rem;
`

export const ItemContent = styled.div`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.3;
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
