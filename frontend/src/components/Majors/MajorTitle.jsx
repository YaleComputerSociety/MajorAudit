import React from "react";
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { Row, Col, Nav } from 'react-bootstrap';

function MajorTitle() {
    const majorName = 'Computer Science'; //add in code for backend
    const dus = 'Y. Richard Yang, 432-6400, AKW 208A; cpsc.yale.edu'; //add in code for backend
    const majorOptions = ["B.A", "B.S"]; // add in code for backend

    return (
        <Card>
            <Card.Body>
                <Tab.Container id="tabs" defaultActiveKey="first">
                    <Row>
                        <Col><h1>{majorName}</h1></Col>
                        <Col>
                            <Nav variant="pills" className="nav-pills" id="pills-tab">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">{majorOptions[0]}</Nav.Link>
                                </Nav.Item>
                                {majorOptions.length == 2 ? <Nav.Item>
                                    <Nav.Link eventKey="second">{majorOptions[1]}</Nav.Link>
                                </Nav.Item> : <></>}
                            </Nav>
                        </Col>
                    </Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <h1>DUS</h1>
                            <h2>{dus}</h2>
                        </Tab.Pane>
                        {majorOptions.length == 2 ? <Tab.Pane eventKey="second">
                            <h1>DUS</h1>
                            <h2>{dus}</h2>
                        </Tab.Pane> : <></>}
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default MajorTitle;