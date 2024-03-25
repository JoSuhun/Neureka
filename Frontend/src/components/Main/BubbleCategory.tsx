import Category from '@src/components/Main/Category'
import * as bc from '@src/components/styles/Main/BubbleCategory'
import { isLoginAtom } from '@src/stores/authAtom'
import { categoriesAtom, categoryToggleAtom } from '@src/stores/mainAtom'
import { Categories } from '@src/types/MainType'
import { useAtom } from 'jotai'

const BubbleCategory = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [categoryToggle, setCategoryToggle] = useAtom(categoryToggleAtom)
  const [selectedCategories, setCategories] = useAtom(categoriesAtom)
  const handleToggleCategory = () => setCategoryToggle(prev => !prev)

  return (
    <bc.Container>
      <bc.ToggleWrapper>
        <bc.CategoryToggle onClick={handleToggleCategory}>
          카테고리 선택
        </bc.CategoryToggle>
      </bc.ToggleWrapper>

      {/* <bc.CategoryWrapper $show={categoryToggle}>
        {Categories.map((element, key) => (
          <Category
            key={key}
            name={element.name}
            image={element.image}
            show={categoryToggle}
          />
        ))}
      </bc.CategoryWrapper>

      <bc.CategoryWrapper $show={categoryToggle}>
        {selectedCategories.map((element, key) => (
          <Category
            key={key}
            name={element.name}
            image={element.image}
            show={categoryToggle}
          />
        ))}
      </bc.CategoryWrapper>

      {!isLogin && (
        <bc.IsLoginContaier>
          서비스를 이용하기 위해서 로그인이 필요합니다.
        </bc.IsLoginContaier>
      )} */}
      {/* 로그인 상태에 따라 IsLoginContainer를 조건부로 보여줍니다 */}
      <bc.CategoryBlocker $isLogin={isLogin}>
        <bc.CategoryWrapper $show={categoryToggle}>
          {Categories.map((element, key) => (
            <Category
              key={key}
              name={element.name}
              image={element.image}
              show={categoryToggle}
            />
          ))}
        </bc.CategoryWrapper>

        <bc.CategoryWrapper $show={categoryToggle}>
          {selectedCategories.map((element, key) => (
            <Category
              key={key}
              name={element.name}
              image={element.image}
              show={categoryToggle}
            />
          ))}
        </bc.CategoryWrapper>

        {!isLogin && (
          <bc.IsLoginContaier $show={categoryToggle}>
            서비스를 이용하기 위해서 로그인이 필요합니다.
          </bc.IsLoginContaier>
        )}
      </bc.CategoryBlocker>
    </bc.Container>
  )
}

export default BubbleCategory
