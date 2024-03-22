import * as k from '@src/components/styles/Main/KeywordNews'
import { useAtom } from 'jotai'
import NewsCard from '@src/components/Main/NewsCard'
import { keywordArticlesAtom, selectedKeywordAtom } from '@src/stores/mainAtom'
import loading from '/image/loading.gif'
export type KeywordNewsProps = {
  isLoading: boolean
}
const KeywordNews = ({ isLoading }: KeywordNewsProps) => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const [keywordArticles, setKeywordArticles] = useAtom(keywordArticlesAtom)

  // 만약 4개 이하라면 없음 카드 추가하기

  return (
    <>
      <k.container>
        {selectedKeyword.keyword !== '' ? (
          <>
            {isLoading ? (
              <>
                <h1>기사 받는 중</h1>
                <img src={loading}></img>
              </>
            ) : (
              <>
                <k.KeywordTitle>Keyword News</k.KeywordTitle>
                <k.SelectedKeyword>{selectedKeyword.keyword}</k.SelectedKeyword>
                <k.KeywordCircle>
                  <k.NewsGrid>
                    {keywordArticles.map((article, index) => (
                      <NewsCard
                        key={index}
                        article={article}
                        className={index % 2 === 0 ? 'odd' : 'even'}
                      />
                    ))}
                  </k.NewsGrid>
                </k.KeywordCircle>
              </>
            )}
          </>
        ) : (
          <k.KeywordTitle>키워드를 선택하세요.</k.KeywordTitle>
        )}
      </k.container>
    </>
  )
}

export default KeywordNews
