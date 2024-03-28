import { useState } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import {
  AddButton,
  RemoveButton,
} from '@src/components/styles/Stocks/MainTopSectionStyle'

const StockTutorial = () => {
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState<Step[]>([
    {
      disableBeacon: true,
      title: '검색기준 선택',
      target: '.selectNorm',
      content: '검색기준을 선택할 수 있습니다.',
    },
    {
      title: '검색',
      target: '.search',
      content: '검색기준에 따라 주식 종목을 검색할 수 있습니다.',
    },
    {
      title: '내 관심 종목',
      target: '.myStock',
      content: '내가 찜한 종목을 볼 수 있습니다.',
    },
    {
      title: '최근 조회 종목',
      target: '.latestStocks',
      content: '최근 조회한 종목을 볼 수 있습니다.',
    },
    // {
    //   title: (
    //     <>
    //       <span>관심 종목 추가/제거 </span>
    //       <AddButton />
    //       <RemoveButton />
    //     </>
    //   ),
    //   target: '.addRemoveBtn',
    //   content: '관심 종목을 추가하거나 제거할 수 있습니다.',
    // },
    {
      title: '주식 정보',
      target: '.stockInfo',
      content:
        '현재가, 전일종가, 시가, 고가, 저가, 거래량 등 당일 주식 정보를 확인할 수 있습니다.',
    },
    {
      title: '캔들차트',
      target: '#chart_1',
      content: '날짜별 종목의 시가, 종가, 최고가, 최저가를 확인할 수 있습니다.',
    },
    {
      title: '거래량 차트',
      target: '#chart_3',
      content: '날짜별 종목의 거래량을 확인할 수 있습니다.',
    },
    {
      title: '종목 최근 뉴스',
      target: '.stockNews',
      content: '해당 종목의 최근 이슈를 확인 할 수 있습니다.',
    },
    // 기타 등등 스텝 추가 가능
  ])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (finishedStatuses.includes(status)) {
      setRun(false)
    }
  }

  return (
    <Joyride
      continuous
      scrollOffset={200}
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  )
}

export default StockTutorial
