import React, { ChangeEvent } from 'react'

interface VolumeSliderProps {
  volume: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const VolumeSlider = ({ volume, onChange }: VolumeSliderProps) => {
  return (
    <div>
      <div>Volume</div>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={volume}
        onChange={onChange}
      />
    </div>
  )
}

export default VolumeSlider
