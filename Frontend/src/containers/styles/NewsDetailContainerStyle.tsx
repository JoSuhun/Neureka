import styled from 'styled-components'

export const HeaderImage = styled.div<{ bgimage: string }>`
  background-color: lightcoral;
  height: 60vh;
  background-image: url(${props => props.bgimage});
  background-size: cover;
`

export const Container = styled.div`
  margin: 0 10%;
  background-color: var(--color-lightgrey);
  display: flex;
  flex-direction: column;
  align-items: center;
`
