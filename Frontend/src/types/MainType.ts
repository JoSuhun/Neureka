import politics from '/category/politics.png'
import cryptocurrency from '/category/cryptocurrency.png'
import stock from '/category/stock.png'
import semiconductor from '/category/semiconductor.png'
import realEstate from '/category/realEstate.png'
import technology from '/category/technology.png'
import global from '/category/global.png'
import etc from '/category/etc.png'
import finance from '/category/finance.png'
import management from '/category/management.png'

export const Categories = [
  { name: '경영', image: management },
  { name: '금융', image: finance },
  { name: '기술', image: technology },
  { name: '반도체', image: semiconductor },
  { name: '가상화폐', image: cryptocurrency },
  { name: '유가증권', image: stock },
  { name: '부동산', image: realEstate },
  { name: '정치', image: politics },
  { name: '해외토픽', image: global },
  { name: '기타', image: etc },
]

export type Category = {
  name: string
  image: string
}

export type KeywordCount = {
  name: string
  count: number
}

export type Bubble = d3.SimulationNodeDatum & {
  id: number
  x: number
  y: number
  r: number
  name: string
}