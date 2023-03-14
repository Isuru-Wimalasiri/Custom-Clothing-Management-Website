import './nav.css';
import { MdFavorite, MdPerson, MdShoppingBag, MdSearch } from 'react-icons/md';
import { Navbar, Container, Nav, Form, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="h1" href="#">
          CozyVesta
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <div className="navbar-nav mx-auto">
            <Nav.Link href="#action1" active>
              Home
            </Nav.Link>
            <Nav.Link href="#action2">Own Design</Nav.Link>
            <Nav.Link href="#action2">Products</Nav.Link>
            <Nav.Link href="#action2">Contact</Nav.Link>
          </div>

          <div className="navbar-nav">
            <Nav.Link href="#action2">
              <MdFavorite size={25} className="react-icons" />
            </Nav.Link>
            <Nav.Link href="#action2">
              <MdPerson size={25} className="react-icons" />
            </Nav.Link>
            <Nav.Link href="#action2">
              <MdShoppingBag size={25} className="react-icons" />
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
