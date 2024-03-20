import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts'

import { initialData } from './test_data'

interface StockData {
  Date: string
  Open: number
  High: number
  Low: number
  Close: number
  Volume: number
  Change: number | null
  ema12?: number // ema12 속성을 옵셔널로 추가
  ema26?: number // ema26 속성을 옵셔널로 추가
}

const StockChartSection = () => {
  // 시간 스케일을 생성하는 함수
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      d => new Date(d.Date),
    )

  // 차트의 높이, 너비 및 여백 설정
  const height = 1000
  const width = 900
  const margin = { left: 0, right: 48, top: 0, bottom: 24 }

  // 12일 지수 이동 평균 계산
  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: StockData, c: number) => {
      d.ema12 = c
    })
    .accessor((d: StockData) => d.ema12)

  // 26일 지수 이동 평균 계산
  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: StockData, c: number) => {
      d.ema26 = c
    })
    .accessor((d: StockData) => d.ema26)

  // Elder Ray 계산
  const elder = elderRay()

  const calculatedData = elder(ema26(ema12(initialData)))

  // 데이터 및 스케일 생성
  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(initialData)

  // 차트에서 사용할 형식 설정
  const pricesDisplayFormat = format('.2f')
  const dateTimeFormat = '%d %b'
  const timeDisplayFormat = timeFormat(dateTimeFormat)
  console.log(timeDisplayFormat)

  // X축 범위 설정
  const max = xAccessor(data[data.length - 1])
  const min = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [min, max + 5]

  // 그리드 및 차트의 높이 설정
  const gridHeight = height - margin.top - margin.bottom
  const elderRayHeight = 100
  const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight]
  const barChartHeight = gridHeight / 4
  const barChartOrigin = (_: any, h: number) => [
    0,
    h - barChartHeight - elderRayHeight,
  ]
  const chartHeight = gridHeight - elderRayHeight

  // Y축 범위 및 기타 차트 속성 설정
  const yExtents = (data: StockData) => {
    return [data.High, data.Low]
  }

  const barChartExtents = (data: StockData) => {
    return data.Volume
  }

  const candleChartExtents = (data: StockData) => {
    return [data.High, data.Low]
  }

  const yEdgeIndicator = (data: StockData) => {
    return data.Close
  }

  const volumeColor = (data: StockData) => {
    return data.Close > data.Open
      ? 'rgba(38, 166, 154, 0.3)'
      : 'rgba(239, 83, 80, 0.3)'
  }

  const volumeSeries = (data: StockData) => {
    return data.Volume
  }

  const openCloseColor = (data: StockData) => {
    return data.Close > data.Open ? '#26a69a' : '#ef5350'
  }

  return (
    <ChartCanvas
      height={height}
      ratio={3}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      {/* 거래량 차트 */}
      <Chart
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
      >
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
      </Chart>

      {/* 캔들차트 */}
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <XAxis showGridLines showTickLabel={false} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />
        <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
        <CurrentCoordinate
          yAccessor={ema26.accessor()}
          fillStyle={ema26.stroke()}
        />
        <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
        <CurrentCoordinate
          yAccessor={ema12.accessor()}
          fillStyle={ema12.stroke()}
        />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
        />
        <MovingAverageTooltip
          origin={[8, 24]}
          options={[
            {
              yAccessor: ema26.accessor(),
              type: 'EMA',
              stroke: ema26.stroke(),
              windowSize: ema26.options().windowSize,
            },
            {
              yAccessor: ema12.accessor(),
              type: 'EMA',
              stroke: ema12.stroke(),
              windowSize: ema12.options().windowSize,
            },
          ]}
        />

        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
      </Chart>

      {/* Elder Ray 차트 */}
      <Chart
        id={4}
        height={elderRayHeight}
        yExtents={[0, elder.accessor()]}
        origin={elderRayOrigin}
        padding={{ top: 8, bottom: 8 }}
      >
        <ElderRaySeries yAccessor={elder.accessor()} />

        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />

        {/* <SingleValueTooltip
          yAccessor={elder.accessor()}
          yLabel="Elder Ray"
          yDisplayFormat={d =>
            `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
              d.bearPower,
            )}`
          }
          origin={[8, 16]}
        /> */}
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  )
}

export default StockChartSection
