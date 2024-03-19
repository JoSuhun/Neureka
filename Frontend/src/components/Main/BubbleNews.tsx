import React, { useEffect } from 'react'
import * as b from '@src/components/styles/Main/BubbleNews'
import { atom, useAtom } from 'jotai'
import BubbleChart from '@src/components/Main/BubbleChart';
import KeywordNews from '@src/components/Main/KeywordNews';

type Props = {}
type Category = String;
export type KeywordCount = {
  name: string;
  count: number;
}
export const categoryToggleAtom = atom(true);
export const categoriesAtom = atom<Category[]>([]);
export const KeywordsAtom = atom<KeywordCount[]>([]);
export const SelectedKeywordAtom = atom<string>('');
const BubbleNews = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [keywords, setKeywords] = useAtom(KeywordsAtom);
  useEffect(() => {
    setKeywords([
    { name: "경제성장", count: 35 },
    { name: "물가상승률", count: 20 },
    { name: "금리정책", count: 31 },
    { name: "국내총생산(GDP)", count: 5 },
    { name: "실업률", count: 50 },
    { name: "인플레이션", count: 11 },
    { name: "경상수지", count: 24 },
    { name: "통화정책", count: 55 },
    { name: "재정정책", count: 6 },
    { name: "주식시장", count: 7 },
    { name: "채권시장", count: 8 },
    { name: "환율", count: 6 },
    { name: "외환보유액", count: 7 },
    { name: "소비자신뢰지수", count: 14 },
    { name: "산업생산", count: 32 },
    { name: "기업투자", count: 17 },
    { name: "수출입", count: 22 },
    { name: "경제협력개발기구(OECD)", count: 44 },
    { name: "세계무역기구(WTO)", count: 37 },
    { name: "국제통화기금(IMF)", count: 16 },
    { name: "세계은행", count: 8 },
    { name: "유럽중앙은행(ECB)", count: 15 },
    { name: "미국연방준비제도(Fed)", count: 17 },
    { name: "브렉시트", count: 19 },
    { name: "글로벌 금융위기", count: 33 },
    { name: "디지털화폐", count: 17 },
    { name: "블록체인 기술", count: 19 },
    { name: "경제 제재", count: 33 },
    { name: "무역전쟁", count: 34 },
    { name: "지속가능성", count: 9 }
  ]);
  }, [])
  
  const handleCategories = (selectedCategory: Category) => {
    setCategories((prev) => {
      const isExisting = prev.includes(selectedCategory);
      if (isExisting) {
        return prev.filter(category => category !== selectedCategory);
      } else {
        return [...prev, selectedCategory].sort();
  }
    })
  }
  const [categoryToggle, setCategoryToggle] = useAtom(categoryToggleAtom);
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
            <b.Category onClick={() => handleCategories(element)} show={categoryToggle}>{element}</b.Category>
          ))}
        </b.CategoryBox>
        <b.CategoryBox show={categoryToggle}>
          {categories.map((element, key) => (
            <b.Category onClick={() => handleCategories(element)} show={categoryToggle}>{element}</b.Category>
          ))}
        </b.CategoryBox>
        <b.ChartBox>
          <BubbleChart />
        </b.ChartBox>
        <b.NewsBox>
          <KeywordNews />
        </b.NewsBox>
      </b.Wrapper>
    </>
  )
}

export default BubbleNews


