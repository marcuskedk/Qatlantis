import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

// BOOTSTRAP
import {Navbar, NavDropdown, Nav} from "react-bootstrap"

const Sidebar = () => {

  const location = useLocation();

  return (
    <>
      <Navbar bg="light" expand="lg" className="header bg-light shadow">
        <Navbar.Brand href="#home" className="py-2 px-3 d-flex m-0 w-100 align-items-center">
          <img src="https://localhost:7141/qatlantis.png" width="50" height="50" className="d-inline-block align-top" alt="React Bootstrap logo" />
          <h3 className="ms-2 m-0 fw-bold text-uppercase brand-text">Qatlantis</h3>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 py-2 px-3">
          <Nav className="ms-auto" activeKey={location.pathname}>
            <li>
              <NavLink activeclassname="active" className="nav-link" to="/">Home</NavLink>
            </li>
            <li>
              <NavLink activeclassname="active" className="nav-link" to="/cases">Case</NavLink>
            </li>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavLink activeclassname="active" className="dropdown-item" to="/profile">Home</NavLink>
              <NavLink activeclassname="active" className="dropdown-item" to="/cases">Home</NavLink>
              <NavLink activeclassname="active" className="dropdown-item" to="/customer">Home</NavLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" expand="lg" className="sidebar flex-column align-items-start shadow">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-column align-items-start w-100 py-2">
          <Nav className="flex-column w-100">
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/case">Home</NavLink>
            </li>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <li className="nav-item">
              <Nav.Link href="#link">Link</Nav.Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Sidebar