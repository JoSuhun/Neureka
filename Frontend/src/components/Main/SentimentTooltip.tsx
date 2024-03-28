import { Sentiment } from '@src/types/MainType'

type Props = {
  sentiments: Sentiment[]
}

const SentimentTooltip = ({ sentiments }: Props) => {
  // sentiment에 따른 스타일과 라벨을 정의하는 함수
  const getStyleAndLabel = (sentiment: Sentiment) => {
    switch (sentiment.label) {
      case 'positive':
        return { color: 'blue', label: '긍정' }
      case 'negative':
        return { color: 'red', label: '부정' }
      case 'neutral':
        return { color: 'grey', label: '중립' }
      default:
        return { color: 'black', label: sentiment.label }
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid black',
      }}
    >
      {sentiments.map((sentiment, index) => {
        const { color, label } = getStyleAndLabel(sentiment) // 스타일과 라벨 가져오기
        return (
          <div key={index} style={{ color }}>
            <strong>{label}</strong>: {sentiment.score.toFixed(2)}
          </div>
        )
      })}
    </div>
  )
}

export default SentimentTooltip
