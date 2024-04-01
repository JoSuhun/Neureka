import Tooltip from '@src/common/Tooltip'
import * as c from '@src/components/styles/TTS/ControlButtonsStyle'

interface ControlButtonsProps {
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  isPlaying: boolean
}

const ControlButtons = ({
  onPlay,
  onPause,
  onStop,
  isPlaying,
}: ControlButtonsProps) => {
  return (
    <c.Container>
      {isPlaying ? (
        <>
          <Tooltip message={'일시정지하시겠습니까?'}>
            <c.PauseButton onClick={onPause} />
          </Tooltip>
          <Tooltip message={'멈추시겠습니까?'}>
            <c.StopButton onClick={onStop} />
          </Tooltip>
        </>
      ) : (
        <Tooltip message={'재생하시겠습니까?'}>
          <c.PlayButton onClick={onPlay} />
        </Tooltip>
      )}
    </c.Container>
  )
}

export default ControlButtons
