import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { handleLogout, isAuthenticated } from '../helpers/auth'
import bean from '../assets/logos2/4.png'


const TheNavbar = ({ setShow, isHome, setTab }) => {
  // const [tab, setTab] = useState('login')
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  
  const handleShow = (e) => {
    setTab(e.target.title)
    setShow(true)
  }
 
  function handleNavigate(location){
    navigate(location)
    setExpanded(false)
  }

  
  return (
    isHome ? 
      <Navbar expanded={expanded} className='navbar' expand="sm" variant='dark'>
        <Container className='d-flex justify-content-end text-end'>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className=' d-sm-flex justify-content-between' id="responsive-navbar-nav">
            <Nav className='d-flex'>
              <Nav.Link  onClick={() => handleNavigate('/active_ingredients')} >Ingredients</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/recipes')}>Recipes</Nav.Link>
            </Nav>
            {/* <Navbar.Brand className='title pb-0' as={Link} to='/'>
              <img className="logo" src={logo} />
            </Navbar.Brand> */}
            <Nav className='d-flex'>
              
              {isAuthenticated() ?
                <>
                  <div className='nav-link' onClick={() => handleLogout(navigate)}>Logout</div>
                  <Nav.Link onClick={() => handleNavigate('/profile')} >Profile</Nav.Link>
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
      <Navbar expanded={expanded} className='navbar normal' expand="sm" variant='dark'>
        <Container >
          <Navbar.Brand className='title pb-0 m-0 d-sm-none' as={Link} to='/'> Wellbean
            <img className="logo" src={bean} />
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse  className='text-end d-sm-flex justify-content-between' id="responsive-navbar-nav">
            <Nav className='d-flex'>
              <Nav.Link onClick={() => handleNavigate('/active_ingredients')} >Ingredients</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/recipes')} >Recipes</Nav.Link>
            </Nav>
            <Navbar.Brand className='title pb-0 d-none d-sm-block' as={Link} to='/'> Wellbean
              <img className="logo" src={bean} />
            </Navbar.Brand>
            <Nav className='d-flex'>
              
              {isAuthenticated() ?
                <>
                  <Nav.Link onClick={() => handleNavigate('/profile')} >Profile</Nav.Link>
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
