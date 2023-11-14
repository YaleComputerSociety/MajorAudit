import React from "react";
import { Card, Button, ButtonGroup, ButtonToolbar, Row, Col, Tab, Container, Nav } from "react-bootstrap";

function GraduationDistributions() {

    return (
        <Card>
            <Card.Body>
                <Tab.Container id="tabs" defaultActiveKey="first">
                    <Row>
                        <Col><h1>Distributions</h1></Col>
                        <Col>
                            <Nav variant="pills" className="nav-pills" id="pills-tab">
                                <Nav.Item>
                                    <Nav.Link eventKey="first-year">First-Year</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sophomore">Sophomore</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="junior">Junior</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="senior">Senior</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="first-year">
                            <Container>
                                <Row>
                                    <Col>
                                        <Row>
                                            <h2>
                                                Areas
                                            </h2>
                                        </Row>
                                        <Row>
                                            <b>
                                                Hu - Humanities & Art
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                So - Social Sciences
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                Sc - Sciences
                                            </b>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <h2>
                                                Credits
                                            </h2>
                                        </Row>
                                        <Row>
                                            <b>
                                                1/1
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                0/1
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                1/1
                                            </b>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <h2>
                                                Courses
                                            </h2>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Col>
                                                    <b>
                                                        LING 191
                                                    </b>
                                                </Col>
                                                <Col>
                                                    <b>
                                                        ARCH 306
                                                    </b>
                                                </Col>
                                            </Container>
                                        </Row>
                                        <Row>

                                        </Row>
                                        <Row>
                                            <Container>
                                                <Col>
                                                    <b>
                                                        CGSC 274
                                                    </b>
                                                </Col>
                                            </Container>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sophomore">
                            <h1>INSERT SOPHOMORE STATS HERE</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="junior">
                            <h1>INSERT JUNIOR STATS HERE</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="senior">
                            <h1>INSERT SENIOR STATS HERE</h1>
                        </Tab.Pane>

                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
}

export default GraduationDistributions;