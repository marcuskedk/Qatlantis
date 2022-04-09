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
              <NavLink activeclassname="active" className="nav-link" to="/">Log ud</NavLink>
            </li>
            <NavDropdown title="Marcus K." id="basic-nav-dropdown">
              <NavLink activeclassname="active" className="dropdown-item" to="/profile">Profil</NavLink>
              <NavLink activeclassname="active" className="dropdown-item" to="/login">Log ud</NavLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" expand="lg" className="sidebar flex-column align-items-start shadow">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-column align-items-start w-100 py-2">
          <Nav className="flex-column w-100">
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/cases">Cases</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/customers">Kunder</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/employees">Medarbejder</NavLink>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Sidebar