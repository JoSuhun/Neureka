import { CategoryBoxProps } from '@src/types/MainType'
import styled from 'styled-components'


export const Container = styled.div`
  width: 100%;
`

export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
`

export const CategoryInfo1 = styled.button`
  background-color: var(--color-yellow);
  color: white;
  width: 40%;
  height: 40px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  font-size: 25px;
  font-weight: 700;
  border: none;
`
export const CategoryInfo2 = styled.div`
  color: black;
  width: 60%;
  height: 40px;
  font-size: 20px;
  border: none;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CategoryWrapper = styled.div`
  margin-bottom: -3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 150px;
  transition: all 0.3s;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-top: 3px solid var(--color-dark);
  border-bottom: 3px solid var(--color-dark);
`

export const Category = styled.button`
  width: 18%;
  height: 50px;
  transition: opacity 0.3s ease;
`

