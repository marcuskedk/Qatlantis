import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// BOOTSTRAP
import { Col, Card, Row, Button, Form } from "react-bootstrap";

const api = {
  baseUrl: 'https://localhost:7141/',
  contentType: "application/json; charset=utf-8"
}

const CreateCase = () => {

  const [ validated, setValidated ] = useState(false);
  const [ validated2, setValidated2 ] = useState(false);
  const [ cases, setCases ] = useState();
  const [ customers, setCustomers ] = useState();
  const [ employees, setEmployees ] = useState();
  const [ createCase, setCreateCase ] = useState();
  const [ createCustomer, setCreateCustomer ] = useState();
  const [ extraCustomer, setExtraCustomer ] = useState(false);

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

  const handleFormSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    fetch(api.baseUrl + "api/cases", {
      method: "POST",
      headers: {
        "content-type": api.contentType
      },
      body: JSON.stringify(createCase)
    }).then(response => console.log(response)).then(json => setCreateCase(json));
  }

  const handleFormChange = event => {
    setCreateCase(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleFormSubmit2 = event => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated2(true);

    fetch(api.baseUrl + "api/customer", {
      method: "POST",
      headers: {
        "content-type": api.contentType
      },
      body: JSON.stringify(createCustomer)
    }).then(response => console.log(response)).then(json => setCreateCustomer(json));
  }

  const handleFormChange2 = event => {
    setCreateCustomer(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const changeFormSelect = event => {
    console.log(event.target.value)
    if (event.target.value == 0) {
      setExtraCustomer(true)
    } else {
      setExtraCustomer(false)
    }
  }

  const changeToFalse = event => {
    setExtraCustomer(false)
  }

  return (
    <>
      <Col md={12}>
        <Card>
          <Card.Body>
            { extraCustomer == false &&
              <>
                <h3 className="d-flex w-100 justify-content-between">Opret kunde <Link className="btn btn-primary rounded-0" to="/cases">Tilbage</Link></h3>
                <Form noValidate validated={validated} onChange={handleFormChange} onSubmit={handleFormSubmit}>
                  <Form.Control required type="hidden" name="status" value="0" />
                  <Row className="g-3">
                    <Form.Group as={Col} sm="6">
                      <Form.Label>Kunde</Form.Label>
                      <select name="customerId" className="form-customselect" onChange={changeFormSelect}>
                        <option hidden defaultValue value="">{"<- VÆLG KUNDE ->"}</option>
                        {customers?.map(cus => (
                          <option key={cus.id} value={cus.id}>{cus.name}</option>
                        ))}
                        <option disabled value="">--------------</option>
                        <option value="0">Opret ny</option>
                      </select>
                    </Form.Group>
                    <Form.Group as={Col} sm="6">
                      <Form.Label>Medarbejder</Form.Label>
                      <select name="employeeId" className="form-customselect">
                        <option hidden defaultValue value="">{"<- VÆLG MEDARBEJDER ->"}</option>
                        {employees?.map(em => (
                          <option key={em.id} value={em.id}>{em.name}</option>
                        ))}
                      </select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="name-validate">
                      <Form.Label>Opgave navn</Form.Label>
                      <Form.Control required type="text" name="title" placeholder="Opgave navn..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave navn.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="bio-validate">
                      <Form.Label>Opgave beskrivelse</Form.Label>
                      <Form.Control required name="description" as="textarea" rows={1} placeholder="Opgave beskrivelse..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave beskrivelse.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="name-validate">
                      <Form.Label>Opgave pris</Form.Label>
                      <Form.Control required type="number" name="price" placeholder="Opgave pris..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave pris.</Form.Control.Feedback>
                    </Form.Group>
                    <Col sm={12}>
                      <Button type="submit" className="btn btn-success rounded-0 btn-md">Opret opgave</Button>
                    </Col>
                  </Row>
                </Form>
              </>
            }
            { extraCustomer == true &&
              <>
                <h3 className="d-flex w-100 justify-content-between">Opret kunde <span className="btn btn-primary rounded-0" onClick={changeToFalse}>Tilbage</span></h3>
                <Form noValidate validated={validated2} onChange={handleFormChange2} onSubmit={handleFormSubmit2}>
                  <Form.Control required type="hidden" name="status" value="0" />
                  <Row className="g-3">
                    <Form.Group as={Col} md="6" controlId="name-validate">
                      <Form.Label>Kunde navn</Form.Label>
                      <Form.Control required type="text" name="name" placeholder="Kunde navn..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave navn.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="name-validate">
                      <Form.Label>Kunde adresse</Form.Label>
                      <Form.Control required type="text" name="adress" placeholder="Kunde adresse..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave navn.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="name-validate">
                      <Form.Label>Kunde email</Form.Label>
                      <Form.Control required type="email" name="email" placeholder="Kunde email..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave navn.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="bio-validate">
                      <Form.Label>Opgave beskrivelse</Form.Label>
                      <Form.Control required name="description" as="textarea" rows={1} placeholder="Opgave beskrivelse..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave beskrivelse.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="name-validate">
                      <Form.Label>Opgave pris</Form.Label>
                      <Form.Control required type="number" name="price" placeholder="Opgave pris..." />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">Skriv opgave pris.</Form.Control.Feedback>
                    </Form.Group>
                    <Col sm={12}>
                      <Button type="submit" className="btn btn-success rounded-0 btn-md">Opret kunde</Button>
                    </Col>
                  </Row>
                </Form>
              </>
            }
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default CreateCase