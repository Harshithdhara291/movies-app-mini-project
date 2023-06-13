/* eslint-disable no-undef */
import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  const tryAgain = () => {
    onClickRetry()
  }
  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686379733/alert-triangle_vrl8ee.png"
        alt="failure view"
        className="alert-icon"
      />
      <h1>Something went wrong. Please try again</h1>
      <button type="button" className="try-again-button" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
