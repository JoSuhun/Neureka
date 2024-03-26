import { CompanyNewsType } from '@src/types/CompanyType'
import * as s from '@src/components/styles/Stocks/StockNewsSectionStyle'

const StockNewsSection = (props: { data: CompanyNewsType[] }) => {
  const { data } = props

  return (
    <s.Container>
      <s.Title>최근 뉴스</s.Title>
      <s.Wrap>
        {data &&
          data.map((item, index) => (
            <s.Item key={index}>
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
