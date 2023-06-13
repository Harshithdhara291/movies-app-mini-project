import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {movieData} = props
  const {posterPath, id, title} = movieData
  return (
    <>
      <li
        key={id}
        style={{listStyleType: 'none'}}
        onClick={() => window.location.reload()}
      >
        <Link to={`/movies/${id}`} className="link-item">
          <img src={posterPath} alt={title} className="poster-image" />
        </Link>
      </li>
    </>
  )
}

export default MovieCard
