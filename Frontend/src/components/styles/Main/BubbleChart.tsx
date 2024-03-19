import styled from 'styled-components';

export const Svg = styled.svg`
  width: 1000px;
  height: 600px;
  border: 1px solid black;
`;

export const Graph = styled.g``;

export const Bubble = styled.circle``;

export const KeywordBox = styled.foreignObject<{ radius: number }>`
  width: ${(props: { radius: number }) => props.radius * 2}px;
  height: ${(props: { radius: number }) => props.radius * 2}px;
  x: ${(props: { radius: number }) => -props.radius}px;
  y: ${(props: { radius: number }) => -props.radius / 3.14}px;
`;

export const Keyword = styled.div<{ radius: number }>`
  font-size: ${(props) => 10 + 2 ** (props.radius / 18)}px;
  word-wrap: break-word;
  color: white;
  width: ${(props) => props.radius * 2}px;
  text-align: center;
  max-height: ${(props) => props.radius * 2}px;
  overflow: hidden;
`;
