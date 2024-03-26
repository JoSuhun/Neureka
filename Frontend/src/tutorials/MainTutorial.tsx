import React, { useState, useEffect } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

const MainTutorial = () => {
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState([
    {
      target: '.CategoryToggle',
      content: '카테고리 목록 토글할 수 있습니다.',
    },
    {
      target: '.CategoryList',
      content: '가능한 카테고리 목록입니다. 원하는 카테고리를 선택해보세요.',
    },
    {
      target: '.SelectedCategories',
      content: '선택된 카테고리가 여기에 표시됩니다.',
    },
    {
      target: '.BubbleChart',
      content: '선택한 카테고리의 키워드가 나옵니다. 버블을 클릭해보세요.',
    },
    {
      target: '.KeywordNews',
      content: '클릭한 버블들에 대한 최신 기사를 확인하세요.',
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
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      callback={handleJoyrideCallback}
    />
  )
}

export default MainTutorial
