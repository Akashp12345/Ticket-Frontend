import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import axios from 'axios';
export default function Checkout() {
  const [modaldata, setModeldata] = useState()
  const [booked, setBooked] = useState()
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const data = useSelector(state => state.movies)
  const { movies, booking, user, bookedseat } = data
  const { name } = useParams()
  useEffect(() => {
    let f1 = movies.find(item => item.MovieName == name)
    setModeldata(f1)
    let arr = [], P = 0, obj = {}, totPrice = 0
    booking.map((item1, ind1) => {
      item1.map((item2, ind2) => {
        ind2 == 0 ? P = item2.Price : item2.map((item, index) => {
          if (item.status == "Selected") {
            obj = {
              seatid: item.seatid,
              Price: P
            }
            totPrice += Number(P)
            arr.push(obj)
          }
        })
      })
    })
    setTotal(totPrice)
    setBooked(arr)
  }, [name])
  const Final = () => {
    let obj = {
      username: user,
      Seats: bookedseat,
      mybooking: {
        moviename: name,
        seats: booked
      }
    }
    axios.post(`/Checkout/${name}`, obj)
      .then(res => {
        alert("Ticket Booked  Successfully")
        navigate("/")
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {modaldata && <Modal show={true} onHide={() => navigate(`/seats/${name}`)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            {modaldata.MovieName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "200px" }}>
          <h4>Booking Details</h4>
          <div>
            {booked.map((item, index) =>
              <div key={index} className="d-flex justify-content-evenly">
                <div>
                  Seat no:-  <label>{item.seatid}</label>
                </div>
                <div>
                  <label>{item.Price}/Rs.</label>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center" }} className="mt-5">
            <h4>Total to Pay :{total} /Rs</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => Final()}>Pay & Submit</Button>
        </Modal.Footer>
      </Modal>}

    </div>
  );
}

