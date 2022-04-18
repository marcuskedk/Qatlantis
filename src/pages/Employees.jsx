import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Table, Button } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const Employees = () => {

  const navigate = useNavigate();

  const [ employees, setEmployees ] = useState();
  const [ update, setUpdate ] = useState(false);

  useEffect(() => {
    fetch(api.baseUrl + "api/employee", {
      method: "GET",
      headers: {
        "content-type": api.contentType
      }
    }).then(response => response.json()).then(json => setEmployees(json));
  }, [update]);

  const handleDeleteCases = event => {
    let id = event.target.dataset.id;

    if (window.confirm("Er du sikker på at du ville slette medarbejder: " + id + "?")) {
      fetch(api.baseUrl + "api/employee/" + id, {
        method: "DELETE",
        headers: {
          "content-type": api.contentType
        }
      }).then(response => response.status == 204 ? setUpdate(!update) : null);
    }
  }

  return (
    <>
      <Col md={6}>
        <Card className="rounded-0">
          <Card.Body className="fw-bold text-uppercase fs-4 text-center">
            <span className="fs-4 me-3">{ employees?.length }</span>
            Medarbejder
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="rounded-0">
          <Card.Body className="fw-bold text-uppercase fs-4 text-center">
            <Link to="/employees/create" className="btn btn-primary rounded-0">Opret medarbejder</Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">#:</th>
              <th>Navn:</th>
              <th>Email:</th>
              <th>Opgaver:</th>
              <th>Slet:</th>
            </tr>
          </thead>
          <tbody>
            { employees?.map((em) => ( 
              <tr key={ em.id }>
                <td className="p-2 text-center" style={{width:"60px"}}><span className="badge bg-secondary">{ em.id }</span></td>
                <td className="p-2">{ em.name }</td>
                <td className="p-2">{ em.email }</td>
                <td className="p-2" style={{width:"170px"}}>{ em.cases.length } Opgaver</td>
                <td className="p-0" style={{width:"100px"}}><button type="button" className="btn btn-danger btn-sm d-block p-2 rounded-0 w-100" data-id={em.id} onClick={handleDeleteCases}>Slet</button></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Employees