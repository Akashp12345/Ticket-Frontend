import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { AddMovies} from '../Data/reducer';
import { useNavigate } from 'react-router-dom';
import '../App.css'
function Home() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const data = useSelector(state => state.movies)
  const { movies,mybooking } = data
  useEffect(() => {
    axios.post('/')
      .then(res => {
        dispatch(AddMovies(res.data.Movies))
      })
  }, [])
  return (
    <div>
      {!mybooking  && <div className='d-flex justify-content-center mt-3'>
      <Carousel variant='light' style={{ width: "100%", height: "auto", maxHeight: "700px" }} >
        {movies.map((item,index) =>
          <Carousel.Item interval={2000} onClick={() => navigate(`/detail/${item.MovieName}`)} key={index}>
            <img className="d-block" src={item.Poster} alt="Third slide" style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "600px" }} />
            <Carousel.Caption  >
              <h1 style={{ color: "white",fontWeight:"600",textShadow:"5px 5px 5px red" }}>{item.MovieName}</h1>
              <p style={{ color: "white" }}>{item.Desc}
              </p>
              <h3 style={{ color: "white" }}>Released In Theatre !</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    </div>}
    
    </div>
  );
}

export default Home;