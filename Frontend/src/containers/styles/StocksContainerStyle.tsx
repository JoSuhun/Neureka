import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 10%;
  display: flex;
  flex-direction: row;
`

export const SidebarWrap = styled.div`
  background-color: var(--color-lightblue);
  flex: 1;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 15vh;
  height: 83vh;
  margin-right: 10px;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.174);
`

export const MainWrap = styled.div`
  background-color: var(--color-lightgrey);
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2%;
  min-height: 100vh;
  padding: 0 2% 5%;
`
