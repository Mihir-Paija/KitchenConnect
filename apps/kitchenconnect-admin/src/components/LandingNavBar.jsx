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


const LandingNavBar = ({ title="KitchenConnect"}) => {
  return (
  
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
           {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingNavBar;

LandingNavBar.propTypes = {
    title: propTypes.string,
    id: propTypes.string,
};
