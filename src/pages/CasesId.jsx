import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import { Col, Card, Table, Button, Form, Row } from "react-bootstrap";

const api = {
    baseUrl: 'https://localhost:7141/',
    contentType: "application/json; charset=utf-8"
}

const CasesId = () => {

    const location = useLocation();
    const itemID = location.search.split("?")[1];

    const [ cases, setCases ] = useState();
    const [ employees, setEmployees ] = useState();
    const [ customers, setCustomers ] = useState();

    useEffect(() => {
        fetch(api.baseUrl + "api/cases/" + itemID, {
            method: "GET",
            headers: {
                "content-type": api.contentType
            }
        }).then(response => response.json()).then(json => {
            setCases(json)
          
            fetch(api.baseUrl + "api/customer/" + json?.customerId, {
                method: "GET",
                headers: {
                    "content-type": api.contentType
                }
            }).then((response) => response.json()).then((json1) => {
                setCustomers(json1)
    
                fetch(api.baseUrl + "api/employee/" + json?.employeeId, {
                    method: "GET",
                    headers: {
                        "content-type": api.contentType
                    }
                }).then((response) => response.json()).then((json2) => setEmployees(json2));
            });
        });
    }, []);

    const startDate = new Date(cases?.startDate).toLocaleString(['ban', 'id']);
    const endDate = new Date(cases?.endDate).toLocaleString(['ban', 'id']);

    return (
        <>
            { itemID == undefined || cases == null ? <Col md={12}><div className="alert alert-danger m-2 p-2">Kunne ikke finde opgaven!</div></Col> :
                <>
                    <Col md={8}>
                        <Card className="rounded-0">
                            <Card.Body className="fs-4 text-center row w-100">
                                <Col md={6}>
                                    <p className="fs-4 mb-0"><b className="text-uppercase fs-4 mb-0">Start Dato:</b> { startDate }</p>
                                </Col>
                                <Col md={6}>
                                    <p className="fs-4 mb-0"><b className="text-uppercase fs-4 mb-0">Slut Dato:</b> { endDate }</p>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="rounded-0">
                            <Card.Body className="fw-bold text-uppercase fs-4 text-center">
                                <Link to="/cases/create" className="btn btn-primary rounded-0">Tilbage</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5}>
                        <Card className="rounded-0">
                            <Card.Body>
                                <Form noValidate>
                                    <Row className="g-3">
                                        <Form.Group as={Col} md="6" controlId="title-validate">
                                            <Form.Label className="mb-0">Opgave navn:</Form.Label>
                                            <Form.Control required type="text" className="border-0 border-bottom rounded-0 border-dark bg-white px-0" disabled name="title" defaultValue={cases?.title} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="title-validate">
                                            <Form.Label className="mb-0">Opgave navn:</Form.Label>
                                            <Form.Control required type="text" className="border-0 border-bottom rounded-0 border-dark bg-white px-0" disabled name="title" defaultValue={cases?.price + " DKK"} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="12" controlId="title-validate">
                                            <Form.Label className="mb-0">Opgave navn:</Form.Label>
                                            <Form.Control required className="border-0 border-bottom rounded-0 border-dark bg-white px-0" disabled rows={3} name="description" as="textarea" defaultValue={cases?.description}  />
                                        </Form.Group>
                                        <Col sm={12}>
                                            <p>Status: { cases?.status == false ? <span className="btn-danger py-1 px-2">Ikke lavet</span> : <span className="btn-success py-1 px-2">Færdig</span> }</p>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Card>
                            <h3 className="p-3 pb-0 mb-0">Medarbejder</h3>
                            <Table responsive className="mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-center">#:</th>
                                        <th>Navn:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 text-center" style={{width:"60px"}}><span className="badge bg-secondary">{ employees?.id }</span></td>
                                        <td className="p-2">{ employees?.name }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                        <Card className="mt-3">
                            <h3 className="p-3 pb-0 mb-0">Kunde</h3>
                            <Table responsive className="mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-center">#:</th>
                                        <th>Navn:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 text-center" style={{width:"60px"}}><span className="badge bg-secondary">{ customers?.id }</span></td>
                                        <td className="p-2">{ customers?.name }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </>
            }
        </>
    )
}

export default CasesId