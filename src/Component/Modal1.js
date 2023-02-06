import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Model1(){
    const[modal,setModal]=useState()
    const navigate=useNavigate()
    const data=useSelector(state=>state.movies)
    const{movies}=data
    const{name}=useParams()
    useEffect(()=>{
let f1=movies.find(item=>item.MovieName==name)

setModal(f1)
    },[movies,name])
    return(
        <div>
        {modal &&  <Modal show={true} onHide={() =>navigate("/")} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: "600" }}>
            <h3 >{modal.MovieName}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "70%", marginRight: "20px" }}>
            <p> {modal.Desc}</p>
            <h5>Rating :{modal.MovieRating}⭐</h5>
          </div>
          <img className="d-block" src={modal.Poster} alt="Third slide" width={200} />
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='success' onClick={()=>navigate(`/seats/${name}`)}>Book Ticket!</Button>
        </Modal.Footer>
      </Modal>}
      </div>
    )
}