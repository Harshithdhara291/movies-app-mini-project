import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  console.log(props)
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const username = localStorage.getItem('user')
  const password = localStorage.getItem('password')
  const lengthNum = password.length
  const masks = '*'.repeat(lengthNum)

  return (
    <div className="account-container">
      <Header />
      <div className="main-container">
        <h1 className="account-heading">Account</h1>
        <hr className="hr-line" />
        <div className="membership-container">
          <p className="left-paras">Member ship</p>
          <div>
            <p className="right-paras">{username}@gmail.com</p>
            <p className="left-paras">Password</p>
            <p className="left-paras">{masks}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details-container">
          <p className="left-paras">Plan details</p>
          <div className="premium-hd-container">
            <p className="right-paras">Premium</p>
            <p className="hd-paras">Ultra HD</p>
          </div>
        </div>
        <hr className="hr-line" />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}
export default Account
