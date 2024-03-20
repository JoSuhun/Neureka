import { selectedKeywordAtom } from '@src/components/Main/BubbleNews'
import * as k from '@src/components/styles/Main/KeywordNews'
import { useAtom } from 'jotai'
import NewsCard from '@src/components/Main/NewsCard'
const KeywordNews = () => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const arr = [1, 2, 3, 4]
  return (
    <>
      <k.container>
        {selectedKeyword ? (
          <>
            <k.KeywordTitle>Keyword News</k.KeywordTitle>
            <k.SelectedKeyword>{selectedKeyword}</k.SelectedKeyword>
            <k.KeywordCircle>
              <k.NewsGrid>
                {selectedKeyword
                  ? arr.map((_, index) => (
                      <NewsCard
                        key={index}
                        className={index % 2 === 0 ? 'odd' : 'even'}
                      />
                    ))
                  : null}
              </k.NewsGrid>
            </k.KeywordCircle>
          </>
        ) : (
          <k.KeywordTitle>키워드를 선택하세요.</k.KeywordTitle>
        )}
      </k.container>
    </>
  )
}

export default KeywordNews
