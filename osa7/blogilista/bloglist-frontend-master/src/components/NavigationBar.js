import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = ({ user, handleLogOut }) => {

  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Navbar.Brand href="#home">Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as='span'><Link to='/'>home</Link></Nav.Link>
          <Nav.Link as='span'><Link to='/users'>users</Link></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as='span'>
            {user
              ? <Navbar.Text className='mr-auto'>Signed in as {user.username}<Button onClick={handleLogOut} variant='link'>log out</Button></Navbar.Text>
              : <Link to='/login'>login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar