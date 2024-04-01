import { useState, useEffect } from 'react'
import VoiceSelect from '@src/components/TTS/VoiceSelect'
import SpeedSlider from '@src/components/TTS/SpeedSlider'
import VolumeSlider from '@src/components/TTS/VolumeSlider'
import ControlButtons from '@src/components/TTS/ControlButtons'
import * as t from '@src/containers/styles/TextToSpeechContainerStyle'

const TextToSpeechContainer = () => {
  // 테스트를 위한 HTML 문자열
  const htmlString: string =
    "<img src='https://imgnews.pstatic.net/image/277/2024/03/28/0005398253_001_20240328080801318.png?type=w647'>\n미래에셋증권은 28일 엔화 약세에 따른 달러 강세 속에서 아시아 주요국의 통화 변동성이 커지고 있다며 외국인의 수급변화에 주목할 필요가 있다고 분석했다.\n\n\n28일 한국 증시는 외국인 수급 동향에 주목해야 한다는 분석이 나왔다. 미국 증시가 전반적인 상승세를 보인 가운데 엔화 약세에 따른 달러 강세 속 아시아 주요국의 통화 변동성이 커지고 있어서다.\n\n\n27일(현지시간) 뉴욕증권거래소(NYSE)에서 다우존스30산업평균지수는 전 거래일보다 477.75포인트(1.22%) 뛴 3만9760.08에 장을 마감했다. S&P500지수는 44.91포인트(0.86%) 오른 5248.49로 거래를 마쳐 역대 최고치를 기록했다. 나스닥지수는 83.82포인트(0.51%) 상승한 1만6399.52에 장을 마쳤다.\n\n\n<img src='https://imgnews.pstatic.net/image/277/2024/03/28/0005398253_002_20240328080801458.jpg?type=w647'>\n뉴욕증시\n\n\n미국 증시는 1분기 말 리밸런싱 영향에 업종별 차별화 양상이 두드러졌다. 29일 성 금요일 휴장과 2월 개인소비지출(PCE)을 앞두고 분기 말 리밸런싱 성 수급 변화가 진행하는 것으로 추정된다. 연초 이후 쏠림 현상을 주도했던 종목은 상대적으로 약세를 보이지만 소외됐던 업종 중심으로 저가 매수성 수급이 유입되는 모양새다.\n\n\n상승세를 주도했던 엔비디아가 2거래일 연속 조정 국면을 보였다. 이런 가운데 브로드컴, TSMC 등도 동반 약세였다. 다만 엔비디아 생태계에 대응하기 위해 UXL 컨소시엄을 구성하겠다고 밝힌 인텔, 퀄컴 등은 상대적으로 강세를 보이는 점도 특징이다. 차별화 양상을 보였던 종목 중심으로 저가 매수세가 유입되며 전반적인 지수 상승폭은 커졌다. 이를 고려하면 낙관적 투자심리는 유효한 것으로 풀이된다.\n\n\n<img src='https://imgnews.pstatic.net/image/277/2024/03/28/0005398253_003_20240328080801488.jpg?type=w647'>\n15일 서울 중구 하나은행 본점 딜링룸 전광판에 엔달러 환율이 표시돼 있다. 사진=강진형 기자aymsdream@\n\n\n28일 국내 증시에서도 이와 유사한 수급 변화가 나타나는지 주목할 필요가 있다. 특히 환율이 변수다. 달러 강세가 지속되고 있어서다. 일본 중앙은행인 일본은행(BOJ)의 엔화 약세에 따른 구두 개입 시사 가능성에도 불구하고 엔화 약세가 해소되지 않으며 달러 강세를 지지했다. 상대적으로 유럽의 조기 금리 인하 가능성이 부각된 점도 달러의 상승 압력에 영향을 주는 것으로 보인다.\n\n\n김석환 미래에셋증권 연구원은 \"엔화 약세에 따른 달러 강세 영향 속 아시아 주요국 통화의 변동성이 커지고 있다\"며 \"특히 원화 약세 강도가 상대적으로 강하게 나타나고 있어 외국인 수급 동향에 주의해야 한다\"고 분석했다.\n\n\n"

  // HTML 에서 텍스트만 추출
  const ParsingHTML = (htmlString: string): string => {
    // HTML 문자열을 파싱하여 DOM 객체 생성
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    let textContent = ''
    // TreeWalker를 사용하여 순수 텍스트 추출
    if (doc.body) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
          if (
            node.parentElement &&
            ['script', 'style'].includes(
              node.parentElement.nodeName.toLowerCase(),
            )
          ) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        },
      })

      let node: Node | null
      let skipNextText = false // 이미지 태그 다음에 나오는 텍스트를 건너뛰기 위한 플래그
      while ((node = walker.nextNode())) {
        const parentNode = node.parentNode
        if (parentNode && parentNode.nodeName.toLowerCase() === 'img') {
          skipNextText = true // 이미지 태그를 만나면 플래그를 설정하여 다음 텍스트를 건너뜁니다.
          continue
        }
        if (skipNextText) {
          skipNextText = false // 이미지 태그 다음의 텍스트를 건너뛰기 위한 플래그가 설정된 경우, 다음 반복에서 플래그를 해제합니다.
          continue
        }
        textContent += node.nodeValue?.trim() || ''
      }
    }

    // 괄호와 특수 기호 제거
    textContent = textContent.replace(/[\[\]\(\){}<>]/g, '')

    return textContent.trim()
  }

  const text = ParsingHTML(htmlString)

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const synth = window.speechSynthesis
    const u = new SpeechSynthesisUtterance(text)
    const voices = synth.getVoices()
    setUtterance(u)
  }, [text])

  // 시작
  const handlePlay = () => {
    const synth = window.speechSynthesis

    if (isPaused) {
      synth.resume()
    } else {
      if (!utterance) {
        return
      }

      const textArray = utterance.text.split(/[\n"']+/) // 정규식
      console.log('text', textArray)

      textArray.forEach(text => {
        const newUtterance = new SpeechSynthesisUtterance(text)
        newUtterance.voice = voice
        newUtterance.rate = rate
        newUtterance.volume = volume
        synth.speak(newUtterance)
      })
    }

    setIsPlaying(true)
    setIsPaused(false)
  }

  // 일시정지
  const handlePause = () => {
    const synth = window.speechSynthesis
    synth.pause()
    setIsPlaying(false)
    setIsPaused(true)
  }

  // 멈춤
  const handleStop = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  // 목소리 변경 및 언어 변경
  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices()
    setVoice(voices.find(v => v.name === event.target.value) || null)
  }

  // 속도 변경
  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(event.target.value))
  }

  // 볼륨 변경
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value))
  }

  return (
    <t.Container>
      <VoiceSelect
        voices={window.speechSynthesis.getVoices()}
        selectedVoice={voice?.name}
        onChange={handleVoiceChange}
      />
      <SpeedSlider rate={rate} onChange={handleRateChange} />
      <VolumeSlider volume={volume} onChange={handleVolumeChange} />
      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        isPlaying={isPlaying}
      />
    </t.Container>
  )
}

export default TextToSpeechContainer
