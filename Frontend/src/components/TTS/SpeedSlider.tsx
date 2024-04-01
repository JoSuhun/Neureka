import React, { ChangeEvent } from 'react'

interface SpeedSliderProps {
  rate: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SpeedSlider = ({ rate, onChange }: SpeedSliderProps) => {
  return (
    <div>
      <div>Speed</div>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={rate}
        onChange={onChange}
      />
    </div>
  )
}

export default SpeedSlider
