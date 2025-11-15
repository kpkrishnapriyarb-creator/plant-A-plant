
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './UserNavBar.css';
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";



function UserNavBar({ cartCount, theme, toggleTheme }) {
  return (
    <Navbar expand="lg" className={`plant-navbar ${theme === "dark" ? "navbar-dark" : "navbar-light"}`}>
      <Container>
        <Navbar.Brand className="navbar-brand-text">
          🌿 PLANT A PLANT
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/shop" className="nav-link-custom">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">
              Contact
            </Nav.Link>

            <NavDropdown title="More" id="basic-nav-dropdown" >
              <NavDropdown.Item as={Link} to="/gallery">
                Gallery
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/care-tips">
                Care Tips
              </NavDropdown.Item>
            </NavDropdown>
            
          <Nav.Link as={Link} to="/cart" className="position-relative-shop">
              <FaShoppingCart size={20} />
          </Nav.Link>





             <Nav.Link as={Link} to="/wishlist" className="position-relative-heart">
              <FaHeart size={20} />
              </Nav.Link>
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavBar;




