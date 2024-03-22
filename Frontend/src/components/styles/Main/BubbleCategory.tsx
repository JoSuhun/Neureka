import { CategoryBoxProps } from '@src/types/MainType'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`

// 카테고리 박스 토글용 버튼
export const CategoryToggle = styled.button`
  background-color: var(--color-yellow);
  color: white;
  width: 40%;
  height: 40px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  font-size: 20px;
  border: none;
`

export const CategoryWrapper = styled.div<CategoryBoxProps>`
  margin-bottom: -1px;
  display: flex;
  flex-wrap: wrap;
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  width: 100%;
  height: ${({ $show }) => ($show ? '150px' : '0')};
  transition: all 0.3s;
  gap: 10px; /* 각 Category 사이의 간격 */
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`

export const Category = styled.button<CategoryBoxProps>`
  width: 18%;
  height: 50px;
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  transition: opacity 0.3s ease;
`
