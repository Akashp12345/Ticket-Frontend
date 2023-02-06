import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { seatbooking } from '../Data/reducer';
export default function Model2() {
  const [modal, setModal] = useState()
  const [Final, setFinal] = useState()
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const { name } = useParams()
  const data = useSelector(state => state.movies)
  const { user } = data
  const dispatch = useDispatch()
  useEffect(() => {
    axios.post(`/seats/${name}`)
      .then(res => {
        setModal(res.data.Seat)
        setFinal(res.data.Seat)
      })
  }, [name])
  const checkout = () => {
    if (user !== "" && count != 0) {
      dispatch(seatbooking({ modal, Final }))
      navigate(`/Checkout/${name}`)
    }
    else if (count != 0) {
      dispatch(seatbooking({ modal, Final }))
      navigate(`/Login/${name}`)
    }
  }
  const seatbook = (ind1, ind2, ind3, item) => {
    if (item.status != "Selected") {
      let booking = [...modal.slice(0, ind1), [...modal[ind1].slice(0, ind2), [...modal[ind1][ind2].slice(0, ind3), { ...modal[ind1][ind2][ind3], ["status"]: "Selected" }, ...modal[ind1][ind2].slice(ind3 + 1)], ...modal[ind1].slice(ind2 + 1)], ...modal.slice(ind1 + 1)]
      let finalboook = [...Final.slice(0, ind1), [...Final[ind1].slice(0, ind2), [...Final[ind1][ind2].slice(0, ind3), { ...Final[ind1][ind2][ind3], ["status"]: "Booked" }, ...Final[ind1][ind2].slice(ind3 + 1)], ...Final[ind1].slice(ind2 + 1)], ...Final.slice(ind1 + 1)]
      setModal(booking)
      setFinal(finalboook)
      setCount(count + 1)

    }
    else {
      let booking = [...modal.slice(0, ind1), [...modal[ind1].slice(0, ind2), [...modal[ind1][ind2].slice(0, ind3), { ...modal[ind1][ind2][ind3], ["status"]: "Available" }, ...modal[ind1][ind2].slice(ind3 + 1)], ...modal[ind1].slice(ind2 + 1)], ...modal.slice(ind1 + 1)]
      let finalboook = [...Final.slice(0, ind1), [...Final[ind1].slice(0, ind2), [...Final[ind1][ind2].slice(0, ind3), { ...Final[ind1][ind2][ind3], ["status"]: "Available" }, ...Final[ind1][ind2].slice(ind3 + 1)], ...Final[ind1].slice(ind2 + 1)], ...Final.slice(ind1 + 1)]
      setModal(booking)
      setFinal(finalboook)
      setCount(count - 1)
    }

  }
  return (
    <div>
      {modal && <Modal
        show={true} onHide={() => navigate("/")} size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: "600" }} >
            <h3>{name}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='d-flex justify-content-end'>
            Status:<label style={{ background: "green", color: "green", borderRadius: "5px" }}>hllo</label> :Selected <label style={{ background: "red", color: "red", borderRadius: "5px" }}>red!</label> :Booked  <label style={{ background: "skyblue", color: "skyblue", borderRadius: "5px" }}>red!</label> :Available
          </div>
          <div style={{ width: "100%" }}>
            {modal.map((item, ind1) =>
              <div key={ind1}>
                {item.map((item, ind2) =>
                  ind2 == 0 ? <div key={ind2} className='mt-3'><h4>{item.name}</h4>  <label>Price:{item.Price} Rs</label></div> : <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-evenly", marginTop: "10px" }}>{item.map((item, ind3) =>
                    <button key={ind3} style={{ ...item.status == "Available" ? { boxShadow: "2px 5px 10px skyblue " } : item.status == "Selected" ? { boxShadow: "2px 5px 10px green " } : item.status == "Booked" ? { boxShadow: "2px 5px 10px red " } : "", width: "auto", minWidth: "22px", contain: "content", borderRadius: "5px", borderStyle: "none" }} disabled={item.status == "Booked"} onClick={() => seatbook(ind1, ind2, ind3, item)}>{item.seatid}</button>
                  )}</div>
                )}</div>
            )}</div>   
        </Modal.Body>
        <hr style={{ width: "70%", alignSelf: "center", height: "20px", border: "1px solid", borderRadius: "20px", boxShadow: "0px -10px 10px black" }} />
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='success' onClick={() => checkout()}>Confirm Ticket!</Button>
        </Modal.Footer>
      </Modal>}
    </div>
  )

}