import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Table } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const Home = () => {

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
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title:</th>
              <th>Beskrivelse:</th>
              <th>Pris:</th>
              <th>Status:</th>
              <th>Kunde:</th>
              <th>Medarbejderen:</th>
              <th>Læs mere:</th>
            </tr>
          </thead>
          <tbody>
            { cases?.map((cas) => ( 
              <tr key={ cas.id }>
                <td>{ cas.title }</td>
                <td>{ cas.description }</td>
                <td>{ cas.price }</td>
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
                <td className="p-0"><Link className="btn btn-primary btn-sm d-block p-2 rounded-0" to={"./cases/" + cas.id }>Læs mere</Link></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Home