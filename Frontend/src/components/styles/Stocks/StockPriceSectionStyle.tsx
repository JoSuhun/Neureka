import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

export const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 10vh;
  padding: 3%;
  border: 2px solid #ccc;
`

export const LeftWrap = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`

export const LeftTopWrap = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  font-size: 2rem;
`

export const LeftBottomWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-top: 2%;
`

export const RightWrap = styled.div`
  flex: 5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 2%;
`

export const RightItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
