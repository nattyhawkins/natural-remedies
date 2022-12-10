import React, { useState } from 'react'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'
import { v4 as uuid } from 'uuid'

const AuthModal = ({ show, setShow, tab, setTab }) => {
  const [ error, setError ] = useState([])
  
  
  const handleClose = () => setShow(false)
  const handleTabChange = (k) => {
    setTab(k)
    setError(false)
  }


  return (
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Tabs 
          id="controlled-tab-example"
          activeKey={tab}
          transition={false}
          onSelect={handleTabChange}
          className='d-flex'
          justify
        >
          <Tab eventKey="register" title="Register">
            <Register setShow={setShow} setTab={setTab} error={error} setError={setError} />
          </Tab>
          <Tab eventKey="login" title="Login">
            <Login setShow={setShow} error={error} setError={setError} />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className='justify-content-start'>
        {error.length > 0 && Array.isArray(error) ? 
          error.map(message => {
            return (
              <small className='text-danger d-block' key={uuid()}>{message}</small>
            )
          })
          :
          <small className='text-danger'>{error}</small>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal