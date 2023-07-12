import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoPotato from "../img/potato.png"
import { Link } from "react-router-dom"
import "./NavbarComponet.css"

export default function NavbarComponet() {

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link to={"/"}>
            <Navbar.Brand className="contenidoLogo">
              <img className="logoPotato_var" src={logoPotato} alt="LogoPotato" />
              <h3>Potato-Soft</h3>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
            </Nav>
            <Form className="d-flex">
              <Navbar.Brand >
                <Link to={"/login"}>
                  Iniciar Sesion
                </Link>
              </Navbar.Brand>
              <Navbar.Brand >
                <Link to={"/registro-maestro"}>
                  Registrar
                </Link>
              </Navbar.Brand>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )

}