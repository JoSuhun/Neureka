import React from 'react'
import * as b from '@src/components/styles/Main/BubbleNews'
import { atom, useAtom } from 'jotai'

type Props = {}
export const categpryToggleAtom = atom(true);
const BubbleNews = () => {
  
  const [categoryToggle, setCategoryToggle] = useAtom(categpryToggleAtom);
  const handleToggleCategory = () => (setCategoryToggle((prev) => !prev))
  const Array = []
  for (let i = 1; i <= 10; i++) {
    // 이미 있는 카테고리 수에 i를 더해 새 카테고리 이름 생성
    const newCategoryName = `카테고리${i}`
    Array.push(newCategoryName)
  }

  return (
    <>
      <b.Wrapper>
        <b.ToggleContainer>
          <b.CategoryToggle onClick={handleToggleCategory}>카테고리 선택</b.CategoryToggle>
        </b.ToggleContainer>
        <b.CategoryBox show={categoryToggle}>
          {Array.map((element, key) => (
            <b.Category show={categoryToggle}>{element}</b.Category>
          ))}
        </b.CategoryBox>
        <b.ChartBox>aa</b.ChartBox>
        <b.NewsBox>aa</b.NewsBox>
      </b.Wrapper>
    </>
  )
}

export default BubbleNews


