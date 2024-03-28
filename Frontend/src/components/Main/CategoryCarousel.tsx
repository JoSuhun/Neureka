// CategoryCarousel 컴포넌트
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Categories, Category } from '@src/types/MainType'
import * as c from '@src/components/styles/Main/CategoryCarousel'
import { Navigation } from 'swiper/modules'
import { categoriesAtom } from '@src/stores/mainAtom'
import { useAtom } from 'jotai'

type Props = {
  show: boolean
}

const CategoryCarousel = ({ show }: Props) => {
  const [categories, setCategories] = useAtom(categoriesAtom)
  const handleCategories = (selectedCategory: Category) => {
    setCategories(prev => {
      // 선택된 카테고리가 이미 리스트에 있는지 확인
      const isExisting = prev.some(
        category => category.name === selectedCategory.name,
      )
      if (isExisting) {
        // 이미 존재하는 경우, 해당 카테고리를 제거
        return prev.filter(category => category.name !== selectedCategory.name)
      } else {
        // 존재하지 않는 경우, 카테고리 추가
        if (prev.length >= 3) {
          return prev
        }
        const updatedCategories = [...prev, selectedCategory]
        const categoryNames = Categories.map(category => category.name) // 카테고리 이름만 추출
        const sortedSelectedCategories = updatedCategories.sort((a, b) => {
          const indexA = categoryNames.indexOf(a.name)
          const indexB = categoryNames.indexOf(b.name)
          return indexA - indexB
        })
        return sortedSelectedCategories
      }
    })
  }
  if (!show) return null
  return (
    <c.CarouselWrapper>
      <Swiper
        modules={[Navigation]} // 모듈 활성화
        slidesPerView={9}
        initialSlide={4} // 초기 슬라이드의 색인 번호입니다
        breakpoints={{
          360: { slidesPerView: 3, initialSlide: 1 },
          640: { slidesPerView: 5, initialSlide: 2 },
          840: { slidesPerView: 7, initialSlide: 3 },
        }}
        navigation={true} // 네비게이션 활성화 수정
        centeredSlides={true}
      >
        {Categories.map((category, index) => (
          <SwiperSlide
            key={index}
            onClick={() =>
              handleCategories({ name: category.name, image: category.image })
            }
          >
            <c.Icon src={category.image} alt={category.name} />
            <c.Category>{category.name}</c.Category>
          </SwiperSlide>
        ))}
      </Swiper>
    </c.CarouselWrapper>
  )
}

export default CategoryCarousel
