import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {isOpen: false}

  handleMenu = () => {
    // const {isOpen} = this.state
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  renderDesktopView = () => (
    <nav className="nav-header">
      <div className="nav-bar-large-container">
        <ul className="nav-menu">
          <ul className="nav-items">
            <Link to="/" className="logo">
              <li className="nav-menu-item">
                <img
                  src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686399906/Group_7399_nfxnz3.png"
                  alt="website logo"
                />
              </li>
            </Link>

            <Link to="/" className="nav-link">
              <li className="nav-menu-item">Home</li>
            </Link>

            <Link to="/popular" className="nav-link">
              <li className="nav-menu-item">Popular</li>
            </Link>
          </ul>
          <ul className="nav-items">
            <button type="button" className="nav-menu-item">
              <Link to="/search" className="nav-link">
                <HiOutlineSearch style={{fontSize: '25px'}} />
              </Link>
            </button>

            <Link to="/account" className="nav-link">
              <li className="nav-menu-item">
                <img
                  src="https://res.cloudinary.com/di4qjlwyr/image/upload/v1686379731/Avatar_webfqe.png"
                  alt="profile"
                />
              </li>
            </Link>
          </ul>
        </ul>
      </div>
    </nav>
  )

  renderOpenView = () => (
    <div className="open-view-container">
      <ul className="ov-nav-items">
        <Link to="/" className="mobile-nav-link">
          <li className="ov-nav-item">Home</li>
        </Link>
        <Link to="/popular" className="mobile-nav-link">
          <li className="ov-nav-item">Popular</li>
        </Link>
        <Link to="/account" className="mobile-nav-link">
          <li className="ov-nav-item">Account</li>
        </Link>
      </ul>
      <button type="button" onClick={this.handleMenu} className="close-button">
        <AiFillCloseCircle className="close-icon" />
      </button>
    </div>
  )

  renderMobileView = () => {
    const {isOpen} = this.state
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
            <button
              type="button"
              className="mobile-nav-menu-item"
              testid="searchButton"
            >
              <Link to="/search" className="mobile-nav-link">
                <HiOutlineSearch style={{fontSize: '25px'}} />
              </Link>
            </button>
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

  render() {
    return (
      <div>
        {this.renderDesktopView()}
        {this.renderMobileView()}
      </div>
    )
  }
}
export default withRouter(Header)
