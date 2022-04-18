import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Table, Button } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const Customers = () => {

  const navigate = useNavigate();

  const [ customers, setCustomers ] = useState();
  const [ update, setUpdate ] = useState(false);

  useEffect(() => {
    fetch(api.baseUrl + "api/customer", {
      method: "GET",
      headers: {
        "content-type": api.contentType
      }
    }).then(response => response.json()).then(json => setCustomers(json));
  }, [update]);

  const handleDeleteCases = event => {
    let id = event.target.dataset.id;

    if (window.confirm("Er du sikker på at du ville slette kunde: " + id + "?")) {
      fetch(api.baseUrl + "api/customer/" + id, {
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
            <span className="fs-4 me-3">{ customers?.length }</span>
            Medarbejder
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="rounded-0">
          <Card.Body className="fw-bold text-uppercase fs-4 text-center">
            <Link to="/customers/create" className="btn btn-primary rounded-0">Opret kunde</Link>
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
              <th>Adresse:</th>
              <th>Opgaver:</th>
              <th>Slet:</th>
            </tr>
          </thead>
          <tbody>
            { customers?.map((cus) => ( 
              <tr key={ cus.id }>
                <td className="p-2 text-center" style={{width:"60px"}}><span className="badge bg-secondary">{ cus.id }</span></td>
                <td className="p-2">{ cus.name }</td>
                <td className="p-2">{ cus.address }</td>
                <td className="p-2">{ cus.email }</td>
                <td className="p-2" style={{width:"170px"}}>{ cus.cases.length } Opgaver</td>
                <td className="p-0" style={{width:"100px"}}><button type="button" className="btn btn-danger btn-sm d-block p-2 rounded-0 w-100" data-id={cus.id} onClick={handleDeleteCases}>Slet</button></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Customers