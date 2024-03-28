import politics from '/category/politics.png'
import cryptocurrency from '/category/cryptocurrency.png'
import stock from '/category/stock.png'
import semiconductor from '/category/semiconductor.png'
import technology from '/category/technology.png'
import global from '/category/global.png'
import finance from '/category/finance.png'
import management from '/category/management.png'

export const Categories = [
  { name: '반도체', image: semiconductor },
  { name: '금융', image: finance },
  { name: '기술', image: technology },
  { name: '경영', image: management },
  { name: '가상화폐', image: cryptocurrency },
  { name: '유가증권', image: stock },
  { name: '정치', image: politics },
  { name: '해외토픽', image: global },
]

export type Category = {
  name: string
  image: string
}

export type KeywordCount = {
  keyword: string
  count: number
  links: string[]
}

export type Bubble = d3.SimulationNodeDatum & {
  id: number;
  x: number;
  y: number;
  r: number;
  name: string;
}

export type CategoryBoxProps = {
  $show: boolean; // boolean에서 string으로 변경
}

export type KeywordNews = {
  message: string
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keyword: string[]
  topic: string
  sentiment: Sentiment[]
}

export type Sentiment = {
  label: string
  score: number
}