import React, { ChangeEvent } from 'react'

interface SpeedSliderProps {
  rate: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SpeedSlider = ({ rate, onChange }: SpeedSliderProps) => {
  return (
    <label>
      Speed
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={rate}
        onChange={onChange}
      />
    </label>
  )
}

export default SpeedSlider
