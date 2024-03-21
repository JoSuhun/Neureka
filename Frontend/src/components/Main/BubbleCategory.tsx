import Category from '@src/components/Main/Category'
import * as bc from '@src/components/styles/Main/BubbleCategory'
import { categoriesAtom, categoryToggleAtom } from '@src/stores/mainAtom'
import { Categories } from '@src/types/MainType'
import { useAtom } from 'jotai'

const BubbleCategory = () => {
  const [categoryToggle, setCategoryToggle] = useAtom(categoryToggleAtom)
  const [selectedCategories, setCategories] = useAtom(categoriesAtom)
  const handleToggleCategory = () => setCategoryToggle(prev => !prev)

  return (
    <>
      <bc.Container>
        <bc.ToggleWrapper>
          <bc.CategoryToggle onClick={handleToggleCategory}>
            카테고리 선택
          </bc.CategoryToggle>
        </bc.ToggleWrapper>

        <bc.CategoryWrapper show={categoryToggle}>
          {Categories.map((element, key) => (
            <Category
              key={key}
              name={element.name}
              image={element.image}
              show={categoryToggle}
            />
          ))}
        </bc.CategoryWrapper>

        <bc.CategoryWrapper show={categoryToggle}>
          {selectedCategories.map((element, key) => (
            <Category
              key={key}
              name={element.name}
              image={element.image}
              show={categoryToggle}
            />
          ))}
        </bc.CategoryWrapper>
      </bc.Container>
    </>
  )
}

export default BubbleCategory
