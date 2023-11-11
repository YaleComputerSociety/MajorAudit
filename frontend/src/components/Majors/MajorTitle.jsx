import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

function MajorTitle() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <h1>Computer Science</h1>
                        </Col>
                        <Col>
                            <Tabs
                                dafaultActiveKey="B.S"
                                id="bs-tab"
                            >
                                <Tab eventKey="B.A" title="B.A">
                                    <h1>DUS</h1>
                                    <h2>Y.Richard Yang, 432-6400, AKW 208A; cpsc.yale.edu</h2>
                                </Tab>
                                <Tab eventKey="B.S" title="B.S">
                                    <h1>DUS</h1>
                                    <h2>Y.Richard Yang, 432-6400, AKW 208A; cpsc.yale.edu</h2>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default MajorTitle;