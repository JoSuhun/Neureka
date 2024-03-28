import styled from 'styled-components'

export const Container = styled.div`
  margin: 2% 2% 0;
  display: flex;
  flex-direction: row;
  gap: 2%;
`

export const SidebarWrap = styled.div`
  background-color: #f8f9ff;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1%;
  min-height: 20vh;
  top: 15vh;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.174);
`

export const MainWrap = styled.div`
  background-color: var(--color-lightgrey);
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 0 2% 2%;

  > * {
    margin-bottom: 3%; /* 각 자식 요소에 마진을 추가하여 간격을 조절합니다 */
  }
`
