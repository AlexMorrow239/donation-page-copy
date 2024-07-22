import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import CaptainLogo from "../../assets/captain_logo.svg";

// import "./index.css";

export default function CustomNavbar() {
  return (
    <Navbar bg="light" expand="lg" id="mainnavigation">
      <Container>
        <Navbar.Brand href="https://captainfanplastic.com/">
          <img
            src={CaptainLogo}
            style={{ height: "64px", width: "auto" }}
            alt="Captain Fanplastic Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarSupportedContent"
          className="ml-auto"
        />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ml-auto" id="navbar-right">
            <Nav.Link
              href="https://captainfanplastic.com/curriculum"
              rel="noopener noreferrer"
            >
              Curriculum
            </Nav.Link>
            <Nav.Link
              href="https://captainfanplastic.com/impact"
              rel="noopener noreferrer"
            >
              Impact
            </Nav.Link>
            <Nav.Link
              href="https://captainfanplastic.com/getinvolved"
              rel="noopener noreferrer"
            >
              Get involved
            </Nav.Link>
            <Nav.Link
              href="https://captainfanplastic.com/gallery"
              rel="noopener noreferrer"
            >
              Gallery
            </Nav.Link>
            <Nav.Link
              href="https://captainfanplastic.com/aboutus"
              rel="noopener noreferrer"
            >
              About us
            </Nav.Link>
            <Nav.Link href="shop">Shop</Nav.Link>
            <Nav.Link href="contact">Contact</Nav.Link>
            <div className="social_icons d-flex justify-content-start">
              <Nav.Link
                href="https://www.facebook.com/captainfanplastic/"
                className="text-soapboxblue"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f ml-0 ml-lg-4"></i>
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/captain_fanplastic/"
                className="text-soapboxblue"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram ml-4"></i>
              </Nav.Link>
              <Nav.Link
                href="https://www.youtube.com/watch?v=-2wxqiuACT4&list=PL-owOFrmpNeLUZKSP1u0G8DG7UTxoC-SX"
                className="text-soapboxblue"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube ml-4"></i>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
