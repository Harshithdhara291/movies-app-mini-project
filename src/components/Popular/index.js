/* eslint-disable jsx-a11y/no-static-element-interactions */
import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../Loading'
import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
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
    console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.results.map(movie => ({
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        id: movie.id,
      }))
      console.log(updatedData)
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      console.log('401 error')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderMoviesListView = () => {
    const {moviesList} = this.state
    return (
      <div>
        <ul className="popular-section">
          {moviesList.map(movie => (
            <MovieCard movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderViewType() {
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

  render() {
    return (
      <>
        <Header />
        <div className="popular-container">
          <div>{this.renderViewType()}</div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Popular
