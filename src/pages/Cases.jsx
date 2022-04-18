import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Table, Button } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const Cases = () => {

  const navigate = useNavigate();

  const [ cases, setCases ] = useState();
  const [ customers, setCustomers ] = useState();
  const [ employees, setEmployees ] = useState();
  const [ editStatus, setEditStatus ] = useState();
  const [ update, setUpdate ] = useState(false);

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
  }, [update]);

  const handleDeleteCases = event => {
    let id = event.target.dataset.id;

    if (window.confirm("Er du sikker på at du ville slette opgave: " + id + "?")) {
      fetch(api.baseUrl + "api/cases/" + id, {
        method: "DELETE",
        headers: {
          "content-type": api.contentType
        }
      }).then(response => response.status == 204 ? setUpdate(!update) : null);
    }
  }

  const handleEditStatusCases = event => {
    let cid = event.target.dataset.id;

    if (window.confirm("Er du sikker på at du ville ændre status på opgave: " + cid + "?")) {
      fetch(api.baseUrl + "api/cases/" + cid, {
        method: "GET",
        headers: {
          "content-type": api.contentType
        }
      }).then(response => response.json()).then(json5 => {

        if (json5.status == true) {
          json5.status = false;
        } else {
          json5.status = true;
        }

        const allData = {
          id: json5.id,
          title: json5.title,
          description: json5.description,
          price: json5.price,
          status: json5.status,
          startDate: json5.startDate,
          endDate: json5.endDate,
          customerId: json5.customerId,
          employeeId: json5.employeeId
        }

        fetch(api.baseUrl + "api/cases/" + cid, {
          method: "PUT",
          headers: {
            "content-type": api.contentType
          },
          body: JSON.stringify(allData)
        }).then(response => response.status == 204 ? setUpdate(!update) : null);
      });
    }
  }

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
              <th className="text-center">#:</th>
              <th>Title:</th>
              <th>Kunde:</th>
              <th>Medarbejderen:</th>
              <th>Redigere:</th>
              <th>Status:</th>
              <th>Slet:</th>
              <th>Læs mere:</th>
            </tr>
          </thead>
          <tbody>
            { cases?.map((cas) => ( 
              <tr key={ cas.id }>
                <td className="p-2 text-center" style={{width:"60px"}}><span className="badge bg-secondary">{ cas.id }</span></td>
                <td className="p-2">{ cas.title }</td>
                { customers?.map((cus) => ( cas.customerId == cus.id &&
                  <td className="p-2" style={{width:"200px"}} key={ cus.id }>
                    { cus.name }
                  </td>
                )) }
                { employees?.map((em) => ( cas.employeeId == em.id &&
                  <td className="p-2" style={{width:"200px"}} key={ em.id }>
                    { em.name }
                  </td>
                )) }
                <td className="p-0" style={{width:"100px"}}><Link className="btn btn-secondary btn-sm d-block w-100 p-2 rounded-0" to={"/cases/editstatus/" + cas.id }>Redigere</Link></td>
                <td className="p-0" style={{width:"100px"}}><button type="button" className={cas.status == false ? "btn btn-danger btn-sm d-block w-100 p-2 rounded-0" : "btn btn-success btn-sm d-block w-100 p-2 rounded-0" } data-id={cas.id} data-status={cas.status} onClick={handleEditStatusCases}>{ cas.status == false ? "Ikke lavet" : "Færdig" }</button></td>
                <td className="p-0" style={{width:"100px"}}><button type="button" className="btn btn-danger btn-sm d-block p-2 rounded-0 w-100" data-id={cas.id} onClick={handleDeleteCases}>Slet</button></td>
                <td className="p-0" style={{width:"100px"}}><Link className="btn btn-primary btn-sm d-block p-2 rounded-0" to={"/cases/case?" + cas.id }>Læs mere</Link></td>
              </tr>
            )) }
          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Cases