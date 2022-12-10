import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import axios from 'axios'

const Register = ({ setTab, error, setError }) => {
  // const [ error, setError ] = useState(false)
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    comments: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      setFormFields({ username: '',  email: '', password: '', password_confirmation: '', comments: [] })
      setTab('login')
    } catch (err) {
      console.log(err.response)
      console.log('values', Object.values(err.response.data))
      setError(err.response.data.non_field_errors ? err.response.data.non_field_errors : Object.values(err.response.data) ? Object.values(err.response.data) : err.response.statusText)
    }
  }

  const handleChange = (e) => {
    const updatedFormFields = {
      ...formFields,
      [e.target.name]: e.target.value,
    }
    setFormFields(updatedFormFields)
    if (error !== []) setError([])
  }


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="reg_user">
          {/* <Form.Label>Username</Form.Label> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3">
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formFields.username}
              required
              autoFocus
            /></FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="reg_email">
          {/* <Form.Label>Email</Form.Label> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formFields.email}
              required
            /></FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="reg_pass">
          {/* <Form.Label>Password</Form.Label> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formFields.password}
              required
            /></FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="reg_confirm">
          {/* <Form.Label>Confirm Password</Form.Label> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Confirm Password"
            className="mb-3">
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formFields.password_confirmation}
              required
            /></FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
        {/* <Form.Text className='d-block'>
          {error && <small className='text-danger'>{error}</small>}
        </Form.Text> */}
      </Form>
      
    </>
  )
}

export default Register