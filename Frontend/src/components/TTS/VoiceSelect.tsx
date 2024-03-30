import React, { ChangeEvent } from 'react'

interface VoiceSelectProps {
  voices: SpeechSynthesisVoice[]
  selectedVoice: string | undefined
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const VoiceSelect = ({ voices, selectedVoice, onChange }: VoiceSelectProps) => {
  return (
    <label>
      Voice
      <select value={selectedVoice} onChange={onChange}>
        {voices.map(voice => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default VoiceSelect
