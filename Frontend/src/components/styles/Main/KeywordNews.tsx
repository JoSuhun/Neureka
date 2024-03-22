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
  margin: 100px 0;
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
  z-index: 10;
  // 가운데 원의 스타일 지정
  width: 12vw; // 실제 크기에 맞게 조정
  height: 12vw; // 실제 크기에 맞게 조정
  border-radius: 50%;
  background-color: #b5c9f0; // 색상은 실제로 원하는 것에 맞게 조정
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; // 텍스트 중앙 정렬
  font-weight: bold;
  font-size: 2vw;
`

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px; // 컨테이너 양쪽 패딩
  .odd {
    grid-column: 1 / 6; // 1번부터 5번 열까지 차지
  }
  .even {
    grid-column: 8 / 13; // 8번부터 12번 열까지 차지
  }
`
