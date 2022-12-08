import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const AuthModal = ({ show, setShow }) => {
  const [ error, setError ] = useState(false)
  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              // onChange={handleChange}
              // value={formFields.username}
              // required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              // onChange={handleChange}
              // value={formFields.password}
              // required
            />
          </Form.Group>
        </Form>
        {error && <small className='text-danger'>{error}</small>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal