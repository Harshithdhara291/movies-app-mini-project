import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactSlickMoviesList from '../ReactSlickContainer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNowSection extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovies()
  }

  onClickRetry = () => {
    this.getMovies()
  }

  getMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(movie => ({
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        id: movie.id,
      }))
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderMoviesListView = () => {
    const {moviesList} = this.state
    return <ReactSlickMoviesList moviesList={moviesList} />
  }

  renderFailureView = () => (
    <div className="failure-view-slider">
      <img
        src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686379733/alert-triangle_vrl8ee.png"
        alt="failure view"
        className="alert-icon"
      />
      <h1 className="failure-view-head">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container-slider" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default TrendingNowSection
