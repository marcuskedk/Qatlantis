import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Table } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const Cases = () => {

  const [ cases, setCases ] = useState();
  const [ customers, setCustomers ] = useState();
  const [ employees, setEmployees ] = useState();

  useEffect(() => {
    fetch(api.baseUrl + "api/cases", {
      method: "GET",
      headers: {
        "content-type": api.contentType
      }
    }).then(response => response.json()).then(json => {
      setCases(json)
      
      fetch(api.baseUrl + "api/customer", {
        method: "GET",
        headers: {
          "content-type": api.contentType
        }
      }).then((response) => response.json()).then((json1) => {
        setCustomers(json1)

        fetch(api.baseUrl + "api/employee", {
          method: "GET",
          headers: {
            "content-type": api.contentType
          }
        }).then((response) => response.json()).then((json2) => setEmployees(json2));
      });
    });
  }, []);

  return (
    <>
      <Col md={6}>
        <Card className="rounded-0">
          <Card.Body className="fw-bold text-uppercase fs-4 text-center">
            <span className="fs-4 me-3">{ cases?.length }</span>
            Opgaver
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="rounded-0">
          <Card.Body className="fw-bold text-uppercase fs-4 text-center">
            <Link to="/cases/create" className="btn btn-primary rounded-0">Opret opgave</Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title:</th>
              <th>Status:</th>
              <th>Kunde:</th>
              <th>Medarbejderen:</th>
              <th>Slet:</th>
              <th>Læs mere:</th>
            </tr>
          </thead>
          <tbody>
            { cases?.map((cas) => ( 
              <tr key={ cas.id }>
                <td>{ cas.title }</td>
                <td>{ cas.status == false ? "Ikke lavet" : "Færdig" }</td>
                { customers?.map((cus) => (
                  <>
                    { cas.customerId == cus.id && <td key={ cus.id }>{ cus.name }</td> }
                  </>
                )) }
                { employees?.map((em) => (
                  <>
                    { cas.employeeId == em.id && <td key={ em.id }>{ em.name }</td> }
                  </>
                )) }
                <td className="p-0"><Link className="btn btn-danger btn-sm d-block p-2 rounded-0" to={"/cases/delete/" + cas.id }>Slet</Link></td>
                <td className="p-0"><Link className="btn btn-primary btn-sm d-block p-2 rounded-0" to={"/cases/" + cas.id }>Læs mere</Link></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Cases