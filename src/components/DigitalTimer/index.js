import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isPlaying: false, minutes: 25, elapsedTime: 1500}

  componentDidMount() {
    this.timerId = setInterval(this.startCountDown, 1000)
  }

  startCountDown = () => {
    const {isPlaying, elapsedTime} = this.state
    if (isPlaying && elapsedTime > 0) {
      this.setState(prevState => ({elapsedTime: prevState.elapsedTime - 1}))
    }
    if (elapsedTime === 0) {
      this.setState({isPlaying: false})
      clearInterval(this.timerId)
    }
  }

  onClickStartOrPause = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  increaseMinutes = () => {
    const {isPlaying} = this.state
    if (isPlaying === false) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        elapsedTime: prevState.elapsedTime + 60,
      }))
    }
  }

  decreaseMinutes = () => {
    const {isPlaying, minutes} = this.state
    if (isPlaying === false && minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        elapsedTime: prevState.elapsedTime - 60,
      }))
    }
  }

  onReset = () => {
    this.setState({isPlaying: false, minutes: 25, elapsedTime: 1500})
  }

  minutes = () => {
    const {elapsedTime} = this.state
    if (Math.ceil(elapsedTime / 60 < 9)) {
      return `0${Math.floor(elapsedTime / 60)}`
    }
    return `${Math.floor(elapsedTime / 60)}`
  }

  seconds = () => {
    const {elapsedTime} = this.state
    if (Math.ceil(elapsedTime % 60 < 10)) {
      return `0${Math.ceil(elapsedTime % 60)}`
    }
    return `${Math.ceil(elapsedTime % 60)}`
  }

  render() {
    const {isPlaying, minutes} = this.state
    const min = this.minutes()
    const sec = this.seconds()
    const playOrPauseIcon = isPlaying
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playOrPauseAlt = isPlaying ? 'pause icon' : 'play icon'
    const playOrPauseText = isPlaying ? 'Pause' : 'Start'
    const playOrPauseDailText = isPlaying ? 'Running' : 'Paused'

    return (
      <div className="mainContainer">
        <h1 className="TimerHeading">Digital Timer</h1>
        <div className="cardContainer">
          <div className="timerContainer">
            <div className="timerClockContainer">
              <h1>{`${min}:${sec}`}</h1>
              <p>{playOrPauseDailText}</p>
            </div>
          </div>
          <div className="controlsContainer">
            <div className="startResetContainer">
              <h1 className="PlayOrPauseControlContainer">
                <button onClick={this.onClickStartOrPause} type="button">
                  <img
                    className="playOrPauseButton"
                    src={playOrPauseIcon}
                    alt={playOrPauseAlt}
                  />
                  {playOrPauseText}
                </button>{' '}
              </h1>
              <h1 className="resetControlContainer">
                <button onClick={this.onReset} type="button">
                  <img
                    className="resetButton"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>{' '}
                Reset
              </h1>
            </div>
            <p>Set timer Limit</p>
            <div className="timeAdjustControlContainer">
              <button
                onClick={this.decreaseMinutes}
                type="button"
                className="timeAdjustControlButton"
              >
                -
              </button>
              <p className="timeInMinPara">{minutes}</p>
              <button
                onClick={this.increaseMinutes}
                type="button"
                className="timeAdjustControlButton"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
