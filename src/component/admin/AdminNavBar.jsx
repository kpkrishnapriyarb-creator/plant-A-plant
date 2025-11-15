
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AdminNavBar.css'

 function UserNavBar() {
  return (
    <Navbar expand="lg" className="plant-navbar">
      <Container>
        <Navbar.Brand className="navbar-brand-text">
          🌿 PLANT A PLANT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="admin/home" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="admin/gallery" className="nav-link-custom">
              Gallery
            </Nav.Link>

        <Nav.Link as={Link} to="admin/manage" className="nav-link-custom">
              Manage
            </Nav.Link>
          <Nav.Link as={Link} to="admin/vieworder" className="nav-link-custom">
              Orders
            </Nav.Link>
            
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="admin/gallery">
                Gallery
              </NavDropdown.Item>
               <NavDropdown.Item as={Link} to="admin/message">
                Message
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default UserNavBar