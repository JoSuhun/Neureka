import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined'

interface ControlButtonsProps {
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  isPaused: boolean
}

const ControlButtons = ({
  onPlay,
  onPause,
  onStop,
  isPaused,
}: ControlButtonsProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
      <VolumeUpOutlinedIcon onClick={onPlay}>
        {isPaused ? 'Resume' : 'Play!'}
      </VolumeUpOutlinedIcon>
      <PauseOutlinedIcon onClick={onPause}>Pause</PauseOutlinedIcon>
      <VolumeOffOutlinedIcon onClick={onStop}>Stop</VolumeOffOutlinedIcon>
    </div>
  )
}

export default ControlButtons
