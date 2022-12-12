import axios from 'axios'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../helpers/auth'

const Login = ({ setShow, error, setError }) => {
  // const [ error, setError ] = useState(false)
  const [formFields, setFormFields] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    if (error !== []) setError([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      setToken(data.token)
      setShow(false)
      setFormFields({ username: '', password: '' })
      window.location.reload(false)
    } catch (err) {
      console.log(err.response)
      setError(err.response.data.detail ? err.response.data.detail : err.response.statusText)

    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="my-3" controlId="log_user">
          {/* <Form.Label>Username</Form.Label> */}
          <FloatingLabel
            controlId="floatingLogUser"
            label="Username"
            className="mb-3">
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formFields.username}
              autoComplete="on"
              required
              autoFocus
            /></FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="log_pass">
          {/* <Form.Label>Password</Form.Label> */}
          <FloatingLabel
            controlId="floatingLogPass"
            label="Password"
            className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formFields.password}
              autoComplete="on"
              required
            /></FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <Form.Text className='d-block'>
          {error && <small className='text-danger'>{error}</small>}
        </Form.Text> */}
      </Form>
    </>
  )
}

export default Login