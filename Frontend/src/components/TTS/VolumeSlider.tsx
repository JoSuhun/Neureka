// import * as React from 'react'
// import Box from '@mui/material/Box'
// import Stack from '@mui/material/Stack'
// import Slider from '@mui/material/Slider'
// import VolumeDown from '@mui/icons-material/VolumeDown'
// import VolumeUp from '@mui/icons-material/VolumeUp'

// const VolumeSlider = () => {
//   const [value, setValue] = React.useState<number>(30)

//   const handleChange = (event: Event, newValue: number | number[]) => {
//     setValue(newValue as number)
//   }

//   return (
//     <Box sx={{ width: 200 }}>
//       <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
//         <VolumeDown />
//         <Slider aria-label="Volume" value={value} onChange={handleChange} />
//         <VolumeUp />
//       </Stack>
//     </Box>
//   )
// }

// export default VolumeSlider

import React, { ChangeEvent } from 'react'

interface VolumeSliderProps {
  volume: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const VolumeSlider = ({ volume, onChange }: VolumeSliderProps) => {
  return (
    <label>
      Volume
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={volume}
        onChange={onChange}
      />
    </label>
  )
}

export default VolumeSlider
