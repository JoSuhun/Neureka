import styled from 'styled-components';

export const Svg = styled.svg`
  width: 1000px;
  height: 600px;
  border: 1px solid black;
`;

export const Graph = styled.g``;

export const Bubble = styled.circle`

`;

export const KeywordBox = styled.foreignObject<{ radius: number }>`
  width: ${(props: { radius: number }) => props.radius * 2}px;
  height: ${(props: { radius: number }) => props.radius * 2}px;
  display: flex; // Flexbox를 사용하여 내부 컨텐츠 중앙 정렬
  justify-content: center; // 가로 축에서 중앙 정렬
  align-items: center; // 세로 축에서 중앙 정렬
  overflow: hidden; // 버블 크기를 넘어가는 텍스트 숨김
`;

export const Keyword = styled.div<{ radius: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props: { radius: number }) => 10 + 2 ** (props.radius / 18)}px;
  word-wrap: break-word;
  color: white;
  text-align: center;
  /* max-height: ${(props: { radius: number }) => props.radius * 2}px; */
  overflow: hidden;
  height: 100%;
`;

// export const Keyword = styled.div<{ radius: number }>`
//   text-align: center; // 텍스트를 가로축에서 중앙 정렬
//   font-size: ${(props: { radius: number }) => Math.max(10, Math.min(props.radius / 3, 20))}px; // 폰트 사이즈를 동적으로 조정
//   color: white;
//   padding: 0 10%; // 텍스트가 foreignObject 경계에 닿지 않도록 패딩 추가
//   word-wrap: break-word; // 긴 텍스트가 줄 바꿈
//   display: flex; // Flexbox를 사용
//   justify-content: center; // 가로 축에서 중앙 정렬
//   align-items: center; // 세로 축에서 중앙 정렬
//   flex-direction: column; // 요소들을 세로로 정렬
//   max-height: 90%; // 버블 내부에 텍스트가 충분한 공간을 갖도록 최대 높이 설정
// `;