/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../styles/NavbarComponent.module.css";
import { propTypes } from "react-bootstrap/esm/Image";
import { NavLink } from "react-router-dom";

// import PropTypes from 'prop-types';


const NavbarComponent = ({ title="KitchenConnect", id="ID12345" }) => {
  return (
  
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard">
           {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/customer">Customer</Nav.Link>
            <Nav.Link as={NavLink} to="/provider">Provider</Nav.Link>
            <Nav.Link as={NavLink} to="/tiffin">Tiffin</Nav.Link>
            <Nav.Link as={NavLink} to="/subscription">Subscription</Nav.Link>
            
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link disabled>{id}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

NavbarComponent.propTypes = {
    title: propTypes.string,
    id: propTypes.string,
};
