import { useEffect, useState } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'

type MainTutorialProps = {
  run: boolean
}

const MainTutorial = ({ run }: MainTutorialProps) => {
  const [shouldRunTutorial, setShouldRunTutorial] = useState(run)
  const [steps, setSteps] = useState<Step[]>([
    {
      disableBeacon: true,
      title: '카테고리창 토글',
      target: '.CategoryToggle',
      content: '카테고리 목록 토글할 수 있습니다.',
    },
    {
      title: '카테고리 선택',
      target: '.CategoryList',
      content: '관심있는 카테고리를 선택해보세요.',
    },
    {
      title: '선택된 카테고리',
      target: '.SelectedCategories',
      content: (
        <>
          <div>선택된 카테고리가 여기에 표시됩니다.</div>
          <div>클릭 시 선택된 카테고리를 제거할 수 있습니다.</div>
        </>
      ),
    },
    {
      title: '키워드 버블',
      target: '.BubbleChart',
      content: '선택한 카테고리의 키워드가 나옵니다. 버블을 클릭해보세요.',
    },
    {
      title: '키워드 기사',
      target: '.KeywordNews',
      content: '클릭한 버블들에 대한 최신 기사를 확인하세요.',
    },
    // 기타 등등 스텝 추가 가능
  ])

  // 투어 상태를 sessionStorage에서 확인
  useEffect(() => {
    const hasMainpageTutorial = sessionStorage.getItem('hasMainpageTutorial')
    // hasRunTutorial이 true이면, 튜토리얼을 실행하지 않도록 shouldRunTutorial 상태를 false로 설정
    if (hasMainpageTutorial) {
      setShouldRunTutorial(false)
    }
  }, [run])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      // 투어가 완료되거나 스킵되었을 때 sessionStorage에 상태 저장
      sessionStorage.setItem('hasMainpageTutorial', 'true')
    }
  }

  return (
    <Joyride
      continuous
      spotlightClicks
      disableOverlayClose
      scrollOffset={200}
      run={run && !sessionStorage.getItem('hasMainpageTutorial')} // sessionStorage 상태에 따라 투어 실행
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

export default MainTutorial
