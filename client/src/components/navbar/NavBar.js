import './nav.css';
import { Badge } from '@material-ui/core';
import { MdFavorite, MdPerson, MdShoppingBag, MdSearch } from 'react-icons/md';
import { Navbar, Container, Nav, Form, Button, Stack } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
  const quantity = useSelector((state) => state.cart.quantity);

  const { currentUser } = useSelector((state) => state.user);
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
          <div className="navbar-nav mx-auto">
            <Nav.Link>
              <NavLink className="navComponents" to="/">
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="navComponents" to="/productList">
                Products
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="navComponents" to="/contact">
                Contact
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink className="navComponents" to="/owndesign">
                Own Design
              </NavLink>
            </Nav.Link>

            {currentUser?.isAdmin && (
              <Nav.Link>
                <NavLink className="navComponents" to="/admin/dashboard">
                  Admin
                </NavLink>
              </Nav.Link>
            )}
          </div>
          <div className="navbar-nav">
            <Nav.Link href="#action2">
              <MdFavorite size={25} className="react-icons" />
            </Nav.Link>
            <Nav.Link href="#action2">
              <MdPerson size={25} className="react-icons" />
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/cart">
                <Badge badgeContent={quantity} color="primary">
                  <MdShoppingBag size={25} className="react-icons" />
                </Badge>
              </NavLink>
            </Nav.Link>
            <Form>
              <Stack direction="horizontal">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="border-0">
                  <MdSearch size={25} className="react-icons " />
                </Button>
              </Stack>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
