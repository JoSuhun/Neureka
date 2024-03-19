import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useAtom } from 'jotai';
import { KeywordCount, KeywordsAtom } from '@src/components/Main/BubbleNews';
import * as b from '@src/components/styles/Main/BubbleChart';
type Bubble = d3.SimulationNodeDatum & {
  id: number;
  x: number;
  y: number;
  r: number;
  name: string;
};

const BubbleChart = () => {
  const [keywords] = useAtom<KeywordCount[]>(KeywordsAtom);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [selectedBubbleId, setSelectedBubbleId] = useState<number | null>(null);

  // 버블과 텍스트 크기를 조정하기 위한 상태
  const dy = [1,1,-1,-1,1,0,-1,0]
  const dx = [1,-1,-1,1,0,1,0,-1]

  const getColorForCount = (count: number): string => {
    if (count <= 10) return "#F28521";
    if (count <= 20) return "#21F2D9";
    if (count <= 30) return "#007EC5";
    if (count <= 40) return "#EE8273";
    return "#B5C9F0"; // 40 이상
  };
  useEffect(() => {
    const scaledBubbles = keywords.map((keyword, index) => ({
      id: index,
      x: 500 + 5 * (index / 8) * dy[index % 8], // 500 (SVG 중앙) 근처의 작은 범위로 무작위 배치
      y: 300 + 5 * (index / 8) * dx[index % 8], // 400 (SVG 중앙) 근처의 작은 범위로 무작위 배치
      vx: 0, // x 방향의 초기 속도
      vy: 0, // y 방향의 초기 속도
      r: 10 + Math.sqrt(keyword.count) * 10,
      name: keyword.name,
    }));

    const simulation = d3.forceSimulation(scaledBubbles)
    .force("charge", d3.forceManyBody().strength(200))
    .force("center", d3.forceCenter(500, 300)) // 중앙으로 이동하는 힘
    .force("collision", d3.forceCollide().radius((d: any) => (d as Bubble).r + 2))
    .on("tick", () => {
      // SVG 영역 내에서 각 버블의 위치 조정
      scaledBubbles.forEach(bubble => {
        bubble.x = Math.max(bubble.r, Math.min(1000 - bubble.r, bubble.x));
        bubble.y = Math.max(bubble.r, Math.min(600 - bubble.r, bubble.y));
      });
    
      setBubbles([...scaledBubbles]);
    });

    // 정리 함수 반환
    return () => {
      simulation.stop();
    };
  }, [keywords]);


  return (
    <b.Svg>
      {bubbles.map((bubble) => (
        <b.Graph
          key={bubble.id}
          className="bubble"
          transform={`translate(${bubble.x}, ${bubble.y})`}
          onClick={() => console.log(bubble.name)}
        >
          <b.Bubble
            r={selectedBubbleId === bubble.id ? bubble.r * 1.1 : bubble.r}
            fill={getColorForCount(Math.pow((bubble.r - 10) / 10, 2))}
          />
          <b.KeywordBox radius={bubble.r}>
            <b.Keyword radius={bubble.r}>
              {bubble.name}
            </b.Keyword>
          </b.KeywordBox>
        </b.Graph>
      ))}
    </b.Svg>
  );
};

export default BubbleChart;
