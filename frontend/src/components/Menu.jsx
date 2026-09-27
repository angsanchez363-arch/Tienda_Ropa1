import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="boutique-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-fashion">
          ATELIER <span>27</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="fashion-nav" />
        <Navbar.Collapse id="fashion-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/prendas" className={isActive('/prendas') ? 'active' : ''}>Colección</Nav.Link>
            <Nav.Link as={Link} to="/clientes" className={isActive('/clientes') ? 'active' : ''}>Clientes</Nav.Link>
            <Nav.Link as={Link} to="/ventas" className={isActive('/ventas') ? 'active' : ''}>Ventas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
