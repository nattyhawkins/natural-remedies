import { Link, useNavigate, useParams } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import { handleLogout, isAuthenticated } from '../helpers/auth'
import bean from '../assets/logos2/4.png'


const TheNavbar = ({ setShow, isHome, setTab }) => {
  // const [tab, setTab] = useState('login')

  const navigate = useNavigate()
  
  const handleShow = (e) => {
    console.log(e.target.title)
    setTab(e.target.title)
    setShow(true)
  }
  
  return (
    isHome ? 
      <Navbar collapseOnSelect data-toggle='collapse' data-target=".navbar-collapse" className='navbar' expand="sm" variant='dark'>
        <Container className='d-fex justify-content-end text-end'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className=' d-sm-flex justify-content-between' id="responsive-navbar-nav">
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
                  <Nav.Link onClick={handleShow} title='register'>Register</Nav.Link>
                  <Nav.Link onClick={handleShow} title='login'>Login</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      :
      <Navbar data-toggle='collapse' data-target=".navbar-collapse" className='navbar normal' expand="sm" variant='dark'>
        <Container >
          <Navbar.Brand className='title pb-0 m-0 d-sm-none' as={Link} to='/'> Wellbean
            <img className="logo" src={bean} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse  className='text-end d-sm-flex justify-content-between' id="responsive-navbar-nav">
            <Nav className='d-flex'>
              <Nav.Link as={Link} to='/active_ingredients'>Ingredients</Nav.Link>
              <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
            </Nav>
            <Navbar.Brand className='title pb-0 d-none d-sm-block' as={Link} to='/'> Wellbean
              <img className="logo" src={bean} />
            </Navbar.Brand>
            <Nav className='d-flex'>
              
              {isAuthenticated() ?
                <>
                  <Nav.Link as={Link} to={'/profile/'} >Profile</Nav.Link>
                  <div className='nav-link' onClick={() => handleLogout(navigate)}>Logout</div>
                </>
                :
                <>
                  <Nav.Link onClick={handleShow} title='register'>Register</Nav.Link>
                  <Nav.Link onClick={handleShow} title='login'>Login</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
export default TheNavbar
