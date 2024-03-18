import styled from 'styled-components'

export const Container = styled.div`
  /* border-top: 1px solid var(--color-blue); */
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  margin: 3%;
  padding: 3%;

  > * {
    margin-bottom: 5%; /* 각 자식 요소에 마진을 추가하여 간격을 조절합니다 */
  }
`

export const Title = styled.p`
  color: var(--color-dark);
  font-size: 1rem;
  font-weight: 700;
  flex: 0 0 auto; /* 자식 요소가 컨테이너의 크기를 기준으로 크기를 조절하지 않도록 설정 */
`

export const Wrap = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  flex: 1; /* 나머지 공간을 채우기 위해 Flexbox 속성 사용 */
  border-radius: 20px;
  box-shadow: inset 0.5px 0.5px 2px 0.5px #e2e2e2;
`
