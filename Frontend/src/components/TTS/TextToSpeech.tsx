import React, { useState, useEffect } from 'react'

import VoiceSelect from './VoiceSelect'
import SpeedSlider from './SpeedSlider'
import VolumeSlider from './VolumeSlider'
import ControlButtons from './ControlButtons'

const TextToSpeech = (props: { text: string }) => {
  const { text } = props

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null,
  )
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

    setIsPaused(false)
  }

  // 일시정지
  const handlePause = () => {
    const synth = window.speechSynthesis
    synth.pause()
    setIsPaused(true)
  }

  // 멈춤
  const handleStop = () => {
    const synth = window.speechSynthesis
    synth.cancel()
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
    <>
      <div>
        <VoiceSelect
          voices={window.speechSynthesis.getVoices()}
          selectedVoice={voice?.name}
          onChange={handleVoiceChange}
        />
        <br />
        <br />

        <SpeedSlider rate={rate} onChange={handleRateChange} />
        <br />

        <VolumeSlider volume={volume} onChange={handleVolumeChange} />
        <br />
        <br />

        <ControlButtons
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
          isPaused={isPaused}
        />
      </div>
    </>
  )
}

export default TextToSpeech
