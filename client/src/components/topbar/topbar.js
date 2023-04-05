import React from 'react';
import { MdOutlineNotifications, MdOutlineLanguage } from 'react-icons/md';
import { Badge } from '@material-ui/core';
import './topbar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Topbar({ setAdminMode }) {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navComponents">
          <Navbar.Brand className="h1">CozyVesta</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <div className="navbar-nav">
            <Nav.Link>
              <NavLink className="navComponents" to="/">
                Client Mode
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/notifications">
                <Badge badgeContent={2} color="primary">
                  <MdOutlineNotifications size={25} className="react-icons" />
                </Badge>
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/languages">
                <Badge badgeContent={2} color="primary">
                  <MdOutlineLanguage size={25} className="react-icons" />
                </Badge>
              </NavLink>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
