import React from "react";
import { Card, Button, ButtonGroup, ButtonToolbar, Row, Col, Tab, Container, Nav, Badge } from "react-bootstrap";

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
                            <Container id="areas">
                                <Row>
                                    <Col md="3">
                                        <Row>
                                            <h2>
                                                Areas
                                            </h2>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    Hu - Humanities & Art
                                                </Badge>
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    So - Social Sciences
                                                </Badge>
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    Sc - Sciences
                                                </Badge>
                                            </b>
                                        </Row>
                                    </Col>
                                    <Col md="2">
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
                                    <Col md="6">
                                        <Row>
                                            <h2>
                                                Courses
                                            </h2>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col md="3">
                                                        <b>
                                                            LING 191
                                                        </b>
                                                    </Col>
                                                    <Col md="3">
                                                        <b>
                                                            ARCH 306
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <b>
                                                            &nbsp;
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <b>
                                                            CGSC 274
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                </Row>
                            </Container>
                            <Container id="skills">
                                <Row>
                                    <Col md="3">
                                        <Row>
                                            <h2>
                                                Skills
                                            </h2>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    QR - Quantitative Reasoning
                                                </Badge>
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    WR - Writing
                                                </Badge>
                                            </b>
                                        </Row>
                                        <Row>
                                            <b>
                                                <Badge bg="secondary">
                                                    L - Language
                                                </Badge>
                                            </b>
                                        </Row>
                                    </Col>
                                    <Col md="2">
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
                                    <Col md="6">
                                        <Row>
                                            <h2>
                                                Courses
                                            </h2>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col md="3">
                                                        <b>
                                                            NCSI 258
                                                        </b>
                                                    </Col>
                                                    <Col md="3">
                                                        <b>
                                                            CPSC 223
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <b>
                                                            &nbsp;
                                                        </b>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>
                                        <Row>
                                            <Container>
                                                <Row>
                                                    <Col md="3">
                                                        <b>
                                                            KREN 110
                                                        </b>
                                                    </Col>
                                                    <Col md="3">
                                                        <b>
                                                            KREN 120
                                                        </b>
                                                    </Col>
                                                </Row>
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