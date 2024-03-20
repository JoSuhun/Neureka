import { selectedKeywordAtom } from '@src/components/Main/BubbleNews'
import * as k from '@src/components/styles/Main/KeywordNews'
import { useAtom } from 'jotai'
import * as n from '@src/components/styles/News/NewsListStyle'
import image from '/image/thumbnail-sample3.png'
import NewsCard from '@src/components/Main/NewsCard'
const KeywordNews = () => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const arr = [1, 2, 3, 4]
  return (
    <>
      <k.container>
        <k.KeywordTitle>Keyword News</k.KeywordTitle>
        <k.KeywordCircle>
          <k.SelectedKeyword>{selectedKeyword}</k.SelectedKeyword>
          <k.NewsGrid>
            {arr.map((_, index) => (
              <NewsCard
                key={index}
                className={index % 2 === 0 ? 'odd' : 'even'}
              />
            ))}
          </k.NewsGrid>
        </k.KeywordCircle>
      </k.container>
    </>
  )
}

export default KeywordNews
