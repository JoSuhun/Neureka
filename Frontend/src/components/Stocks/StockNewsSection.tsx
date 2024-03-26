import { useNavigate } from 'react-router-dom'
import { CompanyNewsType } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/StockNewsSectionStyle'

const StockNewsSection = (props: { data: CompanyNewsType[] }) => {
  const { data } = props

  const navigate = useNavigate()
  const handleNewsDetail = (link: string) => {
    navigate(`/news/detail/${encodeURIComponent(link)}`)
  }

  return (
    <s.Container>
      <s.Title>최근 뉴스</s.Title>
      <s.Wrap>
        {data &&
          data.map((item, index) => (
            <s.Item key={index} onClick={() => handleNewsDetail(item.link)}>
              <s.ItemBox>
                <s.ItemInfo>
                  <s.ItemPublisher>{item.press}</s.ItemPublisher>
                  <s.ItemDate>{item.article_date}</s.ItemDate>
                </s.ItemInfo>
                <s.ItemTitle>{item.title}</s.ItemTitle>
                <s.ItemContent>{item.summary}</s.ItemContent>
              </s.ItemBox>
              {item.thumbnail_url && (
                <s.ItemImage src={item.thumbnail_url} alt="image" />
              )}
            </s.Item>
          ))}
      </s.Wrap>
    </s.Container>
  )
}

export default StockNewsSection
