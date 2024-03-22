import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { useAtom } from 'jotai'
import * as b from '@src/components/styles/Main/BubbleChart'
import { Bubble, KeywordCount } from '@src/types/MainType'
import { keywordsAtom, selectedKeywordAtom } from '@src/stores/mainAtom'

const BubbleChart = () => {
  const [keywords, setKeywords] = useAtom<KeywordCount[]>(keywordsAtom)
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [selectedBubbleId, setSelectedBubbleId] = useState<number | null>(null)
  const [width, setWidth] = useState(window.innerWidth * 0.9)

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
    const keywordInfo = keywords.find(k => k.keyword === keyword)
    if (keywordInfo === undefined) {
      setSelectedKeyword({ keyword: '', count: 0, links: [] })
    } else {
      setSelectedKeyword(keywordInfo)
    }
  }

  const simulationRef = useRef<d3.Simulation<Bubble, undefined> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.9)
    }

    window.addEventListener('resize', handleResize)

    // 이벤트 리스너 정리
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const scaledBubbles = keywords.map((keyword, index) => ({
      id: index,
      x: width / 2 + 5 * (index / 8) * dy[index % 8], // 500 (SVG 중앙) 근처 배치
      y: 300 + 5 * (index / 8) * dx[index % 8], // 300 (SVG 중앙) 근처 배치
      r: 10 + Math.sqrt(keyword.count) * 10,
      name: keyword.keyword,
    }))

    simulationRef.current = d3
      .forceSimulation(scaledBubbles)
      .force('charge', d3.forceManyBody().strength(200))
      .force('center', d3.forceCenter(width / 2, 300)) // 중앙으로 이동하는 힘
      .force(
        'collision',
        d3.forceCollide().radius((d: any) => (d as Bubble).r + 2),
      )
      .on('tick', () => {
        // SVG 영역 내에서 각 버블의 위치 조정
        scaledBubbles.forEach(bubble => {
          bubble.x = Math.max(bubble.r, Math.min(width - bubble.r, bubble.x))
          bubble.y = Math.max(bubble.r, Math.min(600 - bubble.r, bubble.y))
        })

        setBubbles([...scaledBubbles])
      })
  }, [keywords, width])

  return (
    <>
      <b.Container>
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
      </b.Container>
    </>
  )
}

export default BubbleChart
