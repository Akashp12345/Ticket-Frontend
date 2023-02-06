import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { Login,mybook } from '../Data/reducer';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Lgnav() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  const dispatch=useDispatch()
const data=useSelector(state=>state.movies)
const{user,mybooking}=data
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      event.preventDefault();
      event.stopPropagation();
      dispatch(Login(event.target[0].value))
      handleClose()
    }
    setValidated(true);
  }
  const toggle=()=>{
    let flag=true
    dispatch(mybook(flag))
    navigate("/mybooking")
  }
  const movie=()=>{
    let flag=false
    dispatch(mybook(flag))
    navigate("/")
  }
  const SignOut=()=>{
    let signout=""
    let flag=false
    dispatch(Login(signout))
    dispatch(mybook(flag))
  }
  return (
   
      
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container fluid >
        {/* Login */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>Mobile No:</Modal.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Control type='tel' minLength={10} maxLength={10} required />
              <Form.Control.Feedback type="invalid">
                Please enter valid no.
              </Form.Control.Feedback>
              <Button type="submit" className='mx-5 mt-3' >Submit</Button>
            </Form>
          </Modal.Body>

        </Modal>

        {/*nav */}
        <Navbar.Brand >Ticket Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"  >
          <Nav className="me-auto">
            <Nav.Link onClick={()=>movie()}>Movies</Nav.Link>
          </Nav>
          <Nav className='mx-5'>
            {user ? <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Profile
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item onClick={()=>toggle()}>My Booking</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={()=>SignOut()}>SignOut</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> : <Nav.Link onClick={() => handleShow()}>SignIn</Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    
  );
}

export default Lgnav;