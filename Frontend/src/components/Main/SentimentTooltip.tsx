import { Sentiment } from '@src/types/MainType'
import * as s from '@src/components/styles/Main/SentimentTooltip.tsx'
type Props = {
  sentiments: Sentiment[]
}

const SentimentTooltip = ({ sentiments }: Props) => {
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
    <s.Wrapper>
      {sentiments.map((sentiment, index) => {
        const { color, label } = getStyleAndLabel(sentiment)
        return (
          <s.Sentiment key={index} $color={color}>
            <strong>{label}</strong>: {sentiment.score.toFixed(2)}
          </s.Sentiment>
        )
      })}
    </s.Wrapper>
  )
}

export default SentimentTooltip
