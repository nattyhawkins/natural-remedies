import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import React from 'react'


const TheNavbar = () => {

  const navigate = useNavigate()

  return (
    <Navbar className='navbar'>
      <Container className='navbarContainer'>
        <Nav className='navs'>
          <div>
            <Nav.Link as={Link} to='/IngredientIndex'>Ingredients</Nav.Link>
          </div>
          <Navbar.Brand as={Link} to='/'> HOME
            {/* <img className="logo" src={logo} /> */}
          </Navbar.Brand>
          <div>
            <>
              <Nav.Link as={Link} to='/register'>Register</Nav.Link>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            </>
            {/* {isAuthenticated() ?
              <>
                <span className='nav-link' onClick={() => handleLogout(navigate)}>Logout</span>
                <Nav.Link as={Link} to={`/profile/${userId}`} >Profile</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              </>
            } */}
          </div>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default TheNavbar
