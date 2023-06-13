import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Footer from '../Footer'
import Header from '../Header'
import MovieCard from '../MovieCard'
import LoadingView from '../Loading'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    moviesData: {},
    genres: [],
    audios: [],
    similarMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieData()
  }

  onClickRetry = () => {
    this.getMovieData()
  }

  getFormattedData = data => ({
    id: data.movie_details.id,
    title: data.movie_details.title,
    adult: data.movie_details.adult,
    budget: data.movie_details.budget,
    backdropPath: data.movie_details.backdrop_path,
    posterPath: data.movie_details.poster_path,
    runtime: data.movie_details.runtime,
    releaseDate: data.movie_details.release_date,
    overview: data.movie_details.overview,
    voteAverage: data.movie_details.vote_average,
    voteCount: data.movie_details.vote_count,
  })

  getSimilarMoviesFormattedData = data => ({
    id: data.id,
    title: data.title,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
  })

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      //   console.log(updatedData)
      const updatedSimilarProductsData = fetchedData.movie_details.similar_movies.map(
        eachSimilarMovie =>
          this.getSimilarMoviesFormattedData(eachSimilarMovie),
      )
      this.setState({
        moviesData: updatedData,
        apiStatus: apiStatusConstants.success,
        genres: fetchedData.movie_details.genres,
        similarMovies: updatedSimilarProductsData,
        audios: fetchedData.movie_details.spoken_languages,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderMovieDetailsView = () => {
    const {genres, similarMovies, audios, moviesData} = this.state
    // console.log(moviesData)
    const releaseYear = moviesData.releaseDate.slice(0, 4)
    const hours = Math.floor(moviesData.runtime / 60)
    const minutes = moviesData.runtime % 60
    const isAdult = moviesData.adult ? 'A' : 'U/A'
    const relYear = moviesData.releaseDate.split('-')
    const [year, month, day] = [
      parseInt(relYear[0]),
      parseInt(relYear[1]),
      parseInt(relYear[2]),
    ]
    const date = new Date(year, month, day)
    const formattedReleaseDate = format(date, 'do MMM yyyy')
    return (
      <div className="movies-item-details">
        <div
          className="first-container-mid-desktop"
          style={{
            backgroundImage: `url(${moviesData.backdropPath})`,
          }}
        >
          <div className="movie-data-container">
            <h1 className="movie-title">{moviesData.title}</h1>
            <div className="movie-overview-cont">
              <p className="movie-overview">{moviesData.overview}</p>
            </div>

            <div className="movie-other-details">
              <p className="other-details-para">
                {hours}h {minutes}m
              </p>
              <p className="other-details-para-uua">{isAdult}</p>
              <p className="other-details-para">{releaseYear}</p>
            </div>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
        <div
          className="first-container-mid-mobile"
          style={{
            backgroundImage: `url(${moviesData.posterPath})`,
          }}
        >
          <div className="movie-data-container">
            <h1 className="movie-title">{moviesData.title}</h1>
            <div className="movie-overview-cont">
              <p className="movie-overview">{moviesData.overview}</p>
            </div>

            <div className="movie-other-details">
              <p className="other-details-para">
                {hours}h {minutes}m
              </p>
              <p className="other-details-para-uua">{isAdult}</p>
              <p className="other-details-para">{releaseYear}</p>
            </div>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <div className="second-container-mid">
          <div className="second-sub-container">
            <ul className="genres">
              <h1 className="second-container-headings">Genres</h1>
              {genres.map(genre => (
                <li key={genre.id} style={{listStyleType: 'none'}}>
                  <p className="second-container-paras">{genre.name}</p>
                </li>
              ))}
            </ul>
            <div>
              <h1 className="second-container-headings">Audio Available</h1>
              <ul className="audio-para">
                {audios.map(audio => (
                  <li key={audio.id}>
                    <p className="second-container-paras">
                      {audio.english_name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="second-sub-container">
            <div className="genres">
              <h1 className="second-container-headings">Rating Count</h1>
              <p className="second-container-paras">{moviesData.voteCount}</p>
              <h1 className="second-container-headings">Rating Average</h1>
              <p className="second-container-paras">{moviesData.voteAverage}</p>
            </div>
            <div className="genres">
              <h1 className="second-container-headings">Budget</h1>
              <p className="second-container-paras">{moviesData.budget}</p>
              <h1 className="second-container-headings">Release Date</h1>
              <p className="second-container-paras">{formattedReleaseDate}</p>
            </div>
          </div>
        </div>
        <div className="similar-movies-container">
          <h1 className="similar-movies-head">More like this</h1>
          <div className="similar-movies">
            {similarMovies.map(movie => (
              <MovieCard movieData={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
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
        <div>{this.renderMovieDetails()}</div>
        <div className="footer-container">
          <Footer />
        </div>
      </>
    )
  }
}

export default MovieItemDetails
