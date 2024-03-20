import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { useAtom } from 'jotai'
import * as b from '@src/components/styles/Main/BubbleChart'
import { Bubble, KeywordCount } from '@src/types/MainType'
import { keywordsAtom, selectedKeywordAtom } from '@src/stores/mainAtom'

const BubbleChart = () => {
  const [keywords] = useAtom<KeywordCount[]>(keywordsAtom)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom)

  const [selectedBubbleId, setSelectedBubbleId] = useState<number | null>(null)

  // 버블과 텍스트 크기를 조정하기 위한 상태
  const dy = [1, 1, -1, -1, 1, 0, -1, 0]
  const dx = [1, -1, -1, 1, 0, 1, 0, -1]

  const getColorForCount = (count: number): string => {
    if (count <= 10) return '#F28521'
    if (count <= 20) return '#21F2D9'
    if (count <= 30) return '#007EC5'
    if (count <= 40) return '#EE8273'
    return '#B5C9F0' // 40 이상
  }

  const handleSelectKeyword = (keyword: string) => {
    setSelectedKeyword(keyword)
  }
  useEffect(() => {
    const scaledBubbles = keywords.map((keyword, index) => ({
      id: index,
      x: 500 + 5 * (index / 8) * dy[index % 8], // 500 (SVG 중앙) 근처 배치
      y: 300 + 5 * (index / 8) * dx[index % 8], // 300 (SVG 중앙) 근처 배치
      vx: 0,
      vy: 0,
      r: 10 + Math.sqrt(keyword.count) * 10,
      name: keyword.name,
    }))

    const simulation = d3
      .forceSimulation(scaledBubbles)
      .force('charge', d3.forceManyBody().strength(200))
      .force('center', d3.forceCenter(500, 300)) // 중앙으로 이동하는 힘
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => (d as Bubble).r + 2),
      )
      .on('tick', () => {
        // SVG 영역 내에서 각 버블의 위치 조정
        scaledBubbles.forEach(bubble => {
          bubble.x = Math.max(bubble.r, Math.min(1000 - bubble.r, bubble.x))
          bubble.y = Math.max(bubble.r, Math.min(600 - bubble.r, bubble.y))
        })

        setBubbles([...scaledBubbles])
      })

    // 정리 함수 반환
    return () => {
      simulation.stop()
    }
  }, [keywords])

  return (
    <b.Svg>
      {bubbles.map(bubble => (
        <b.Graph
          key={bubble.id}
          transform={`translate(${bubble.x}, ${bubble.y})`}
          onClick={() => handleSelectKeyword(bubble.name)}
        >
          <b.Bubble
            r={selectedBubbleId === bubble.id ? bubble.r * 1.1 : bubble.r}
            fill={getColorForCount(Math.pow((bubble.r - 10) / 10, 2))}
          />
          <b.KeywordBox radius={bubble.r} x={-bubble.r} y={-bubble.r}>
            <b.Keyword radius={bubble.r}>{bubble.name}</b.Keyword>
          </b.KeywordBox>
        </b.Graph>
      ))}
    </b.Svg>
  )
}

export default BubbleChart
