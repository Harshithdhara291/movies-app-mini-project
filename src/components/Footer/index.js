import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="icons-container">
      <FaGoogle className="icon" />
      <FaTwitter className="icon" />
      <FaInstagram className="icon" />
      <FaYoutube className="icon" />
    </div>
    <p className="contact-us-head">Contact us</p>
  </footer>
)

export default Footer
