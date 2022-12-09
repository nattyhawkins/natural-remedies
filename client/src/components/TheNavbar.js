import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import AuthModal from './AuthModal'
import { handleLogout, isAuthenticated } from '../helpers/auth'


const TheNavbar = () => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('login')

  const navigate = useNavigate()

  
  const handleShow = (e) => {
    console.log(e.target.title)
    setTab(e.target.title)
    setShow(true)
  }

  
  return (
    <Navbar className='navbar'>
      <Container className='navbarContainer d-flex justify-content-between'>
        <Nav className='d-flex'>
          <Nav.Link as={Link} to='/active_ingredients'>Ingredients</Nav.Link>
          <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
        </Nav>
        <Navbar.Brand className='logo' as={Link} to='/'> HOME
          {/* <img className="logo" src={logo} /> */}
        </Navbar.Brand>
        <Nav className='d-flex'>
          
          {isAuthenticated() ?
            <>
              <div className='nav-link' onClick={() => handleLogout(navigate)}>Logout</div>
              <Nav.Link as={Link} to={'/profile/'} >Profile</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} onClick={handleShow} title='register'>Register</Nav.Link>
              <Nav.Link as={Link} onClick={handleShow} title='login'>Login</Nav.Link>
              <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  )
}
export default TheNavbar
