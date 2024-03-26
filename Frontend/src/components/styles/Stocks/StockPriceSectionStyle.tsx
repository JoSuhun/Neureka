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
  background-color: white;
  width: 100%;
  height: 15vh;
  padding: 3% 0;
  border: 2px solid #000;
`

export const LeftWrap = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin-left: 3%;
`

export const LeftTopWrap = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
`

export const LeftBottomWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`

export const Divider = styled.span`
  border-left: 1px solid #ccc;
  height: 100%;
  margin: 0 1%;
`

export const RightWrap = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 3%;
`

export const RightTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const RightBottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
