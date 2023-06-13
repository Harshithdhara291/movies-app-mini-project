/* eslint-disable jsx-a11y/no-static-element-interactions */
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'

import Cookies from 'js-cookie'
import LoadingView from '../Loading'
import FailureView from '../FailureView'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    isOpen: false,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    resultMovies: [],
  }

  handleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  clickSearchInput = () => {
    this.getResultMovies()
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getResultMovies()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    this.getResultMovies()
  }

  getResultMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.results.map(movie => ({
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        id: movie.id,
      }))
      this.setState({
        resultMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderDesktopHeader = () => {
    const {searchInput} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <div className="nav-items">
              <li className="nav-menu-item">
                <Link to="/" className="logo">
                  <img
                    src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686399906/Group_7399_nfxnz3.png"
                    alt="website logo"
                  />
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/popular" className="nav-link">
                  Popular
                </Link>
              </li>
            </div>
            <div className="nav-items">
              <li className="nav-menu-item">
                <Link to="/search" className="nav-link">
                  <div className="search-input-container">
                    <input
                      type="search"
                      className="search-input"
                      value={searchInput}
                      onChange={this.changeSearchInput}
                      onKeyDown={this.enterSearchInput}
                    />
                    <button
                      type="button"
                      className="search-icon"
                      onClick={this.clickSearchInput}
                    >
                      <HiOutlineSearch />
                    </button>
                  </div>
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/account" className="nav-link">
                  <img
                    src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686379731/Avatar_webfqe.png"
                    alt="profile"
                  />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    )
  }

  renderMoviesListView = () => {
    const {resultMovies, searchInput} = this.state
    const Results = resultMovies.length > 0
    return Results ? (
      <div className="search-section">
        {resultMovies.map(movie => (
          <MovieCard movieData={movie} key={movie.id} />
        ))}
      </div>
    ) : (
      <div className="no-result-search-section">
        <img
          src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686480269/Group_7394_cks4mg.png"
          alt="no movies"
          className="no-result-image"
        />
        <h1 className="no-result-search-head">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderOpenView = () => (
    <div className="open-view-container">
      <div className="ov-nav-items">
        <Link to="/" className="mobile-nav-link">
          <h1 className="ov-nav-item">Home</h1>
        </Link>
        <Link to="/popular" className="mobile-nav-link">
          <h1 className="ov-nav-item">Popular</h1>
        </Link>
        <Link to="/account" className="mobile-nav-link">
          <h1 className="ov-nav-item">Account</h1>
        </Link>
      </div>
      <button type="button" onClick={this.handleMenu} className="close-button">
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  renderMobileView = () => {
    const {isOpen, searchInput} = this.state
    return (
      <nav className="mobile-nav-header">
        <div className="mobile-nav-menu">
          <div className="mobile-nav-menu-item">
            <Link to="/" className="mobile-logo">
              <img
                src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686399906/Group_7399_nfxnz3.png"
                alt="website logo"
                className="mobile-logo"
              />
            </Link>
          </div>
          <div className="mobile-nav-items">
            <li className="mobile-nav-menu-item">
              <Link to="/search" className="nav-link">
                <div className="search-input-container">
                  <input
                    type="search"
                    className="search-input"
                    value={searchInput}
                    onChange={this.changeSearchInput}
                    onKeyDown={this.enterSearchInput}
                  />
                  <button
                    type="button"
                    className="search-icon"
                    onClick={this.clickSearchInput}
                  >
                    <HiOutlineSearch />
                  </button>
                </div>
              </Link>
            </li>
            <li className="mobile-nav-menu-item">
              <button
                type="button"
                className="mobile-button-nav-link"
                onClick={this.handleMenu}
              >
                <img
                  src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686485497/add-to-queue_1_xszza9.png"
                  alt="menu-icon"
                  className="mobile-menu-icon"
                />
              </button>
            </li>
          </div>
        </div>
        <div>{isOpen && this.renderOpenView()}</div>
      </nav>
    )
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderAllMovies = () => {
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
      <div className="search-container">
        <div className="desktop-header">{this.renderDesktopHeader()}</div>
        <div className="mobile-header">{this.renderMobileView()}</div>
        {this.renderAllMovies()}
      </div>
    )
  }
}

export default Search
