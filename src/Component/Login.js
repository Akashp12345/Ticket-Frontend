import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Login } from '../Data/reducer';
export default function SignIn() {
  const [validated, setValidated] = useState(false);
  const { name } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      navigate(`/Checkout/${name}`)
    }
    setValidated(true);
  };
  return (
    <Modal show={true} onHide={() => navigate(`/seats/${name}`)}>
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
  );
}
