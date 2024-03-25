import * as k from '@src/components/styles/Main/KeywordNews'
import { useAtom } from 'jotai'
import NewsCard from '@src/components/Main/NewsCard'
import { selectedKeywordAtom } from '@src/stores/mainAtom'
import { KeywordNews } from '@src/types/MainType'

export type KeywordNewsProps = {
  keywordNews: KeywordNews[]
}

const KeywordNews = ({ keywordNews }: KeywordNewsProps) => {
  const [selectedKeyword] = useAtom(selectedKeywordAtom)
  const safeKeywordNews = Array.isArray(keywordNews) ? keywordNews : []

  // 더미 뉴스 데이터 생성
  const dummyData = {
    message: '관련 기사가 없습니다',
    thumbnail_url: '', // 더미 데이터에는 썸네일 없음
    article_title: '관련 기사가 없습니다',
    article_link: '',
    article_summary: '',
    press: '',
    date_time: '',
    keyword: [],
    topic: '',
  }

  // 필요한 더미 데이터 개수 계산
  const dummyItemsNeeded = Math.max(0, 4 - safeKeywordNews.length)
  const dummyItems = Array.from({ length: dummyItemsNeeded }, () => dummyData)

  // 기존 뉴스 데이터와 더미 데이터 합치기
  const displayItems = [...safeKeywordNews, ...dummyItems]

  return (
    <>
      <k.container>
        {selectedKeyword.keyword !== '' ? (
          <>
            <k.KeywordTitle>Keyword News</k.KeywordTitle>
            <k.KeywordCircle>
              <k.SelectedKeyword>{selectedKeyword.keyword}</k.SelectedKeyword>
              <k.NewsGrid>
                {displayItems.map((article, index) => (
                  <NewsCard
                    key={index}
                    article={article}
                    className={`${index % 2 === 0 ? 'odd' : 'even'}`}
                  />
                ))}
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
