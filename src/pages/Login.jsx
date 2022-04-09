import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Container, Row, InputGroup, FormControl } from "react-bootstrap";

const Login = () => {
  return (
    <>
    <Container>
      <Row className="justify-content-center g-3">
        <Col md={8}>
          <Card>
            <Card.Body className="text-center fw-bold fs-5">
              Velkommen til Qatlantis, log ind for at oprette cases osv.
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row className="justify-content-center g-3">
                <Col sm={12}>
                    <h3>Informations</h3>
                </Col>
                <Col md={12}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Brugernavn</InputGroup.Text>
                    <FormControl placeholder="Brugernavn..." aria-label="Brugernavn" aria-describedby="basic-addon1" required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Adgangskode</InputGroup.Text>
                    <FormControl placeholder="Adgangskode..." aria-label="Adgangskode" aria-describedby="basic-addon1" required />
                  </InputGroup>
                </Col>
                <Col sm={12}>
                  <Link to="/dashboard" className="btn btn-success">Log Ind</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;