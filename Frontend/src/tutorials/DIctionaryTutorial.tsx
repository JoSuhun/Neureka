import React, { useState } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

const DictionaryTutorial = () => {
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState([
    {
      target: '.dictionaryPage',
      content: '경제용어 사전페이지 입니다.',
    },
    {
      target: '.searchSection',
      content: '가능한 카테고리 목록입니다. 원하는 카테고리를 선택해보세요.',
    },
    {
      target: '.searchBar',
      content: '선택된 카테고리가 여기에 표시됩니다.',
    },
    {
      target: '.cardBox',
      content: '경제용어 설명입니다.',
    },
    {
      target: '.saveBtn',
      content: '클릭한 버블들에 대한 최신 기사를 확인하세요.',
    },
    {
      target: '.KeywordNews',
      content: '클릭한 버블들에 대한 최신 기사를 확인하세요.',
    },
    {
      target: '.KeywordNews',
      content: '클릭한 버블들에 대한 최신 기사를 확인하세요.',
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

export default DictionaryTutorial
