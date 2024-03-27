import React, { useState } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'

const DictionaryTutorial = () => {
  const [run, setRun] = useState(true)
  const [steps, setSteps] = useState<Step[]>([
    {
      disableBeacon: true,
      title: '경제용어 사전 목록',
      target: '.searchSection',
      content: '경제용어 사전에 있는 단어들을 볼 수 있습니다.',
    },
    {
      title: '검색',
      target: '.searchBar',
      content: '궁금한 단어를 검색할 수 있습니다.',
    },
    {
      title: '단어 카드',
      target: '.cardBox',
      content: '각 경제용어에 대한 설명입니다.',
    },
    {
      title: '단어 저장',
      target: '.saveBtn',
      content: '클릭을 통해 해당 단어를 저장할 수 있습니다.',
    },
    {
      title: '저장한 단어 목록',
      target: '.wordsSection',
      content: '저장한 경제용어입니다.',
    },
    {
      title: '저장 취소',
      target: '.deleteBtn',
      content: '클릭을 통해 저장을 취소할 수 있습니다.',
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
