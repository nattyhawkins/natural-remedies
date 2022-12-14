import { Link, useNavigate, useParams } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import AuthModal from './AuthModal'
import { handleLogout, isAuthenticated } from '../helpers/auth'
import bean from '../assets/logos2/4.png'
import logo from '../assets/logos2/3.png'


const TheNavbar = ({ setShow, show, isHome }) => {
  const [tab, setTab] = useState('login')

  const navigate = useNavigate()
  
  const handleShow = (e) => {
    console.log(e.target.title)
    setTab(e.target.title)
    setShow(true)
  }
  
  return (
    isHome ? 
      <Navbar className='navbar' >
        <Container className='navbarContainer d-flex justify-content-between'>
          <Nav className='d-flex'>
            <Nav.Link as={Link} to='/active_ingredients'>Ingredients</Nav.Link>
            <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
          </Nav>
          {/* <Navbar.Brand className='title pb-0' as={Link} to='/'>
            <img className="logo" src={logo} />
          </Navbar.Brand> */}
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
              </>
            }
          </Nav>
        </Container>
      </Navbar>
      :
      <Navbar className='navbar normal'>
        <Container className='navbarContainer d-flex justify-content-between'>
          <Nav className='d-flex'>
            <Nav.Link as={Link} to='/active_ingredients'>Ingredients</Nav.Link>
            <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
          </Nav>
          <Navbar.Brand className='title pb-0' as={Link} to='/'> Wellbean
            <img className="logo" src={bean} />
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
              </>
            }
          </Nav>
        </Container>
      </Navbar>
  )
}
export default TheNavbar
