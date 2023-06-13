import Slider from 'react-slick'
import MovieCard from '../MovieCard'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlickMoviesList = props => {
  const {moviesList} = props
  return (
    <div className="trending-now-section">
      <Slider {...settings}>
        {moviesList.map(movie => (
          <MovieCard movieData={movie} key={movie.id} />
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlickMoviesList
