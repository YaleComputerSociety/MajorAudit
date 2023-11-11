import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

function MajorRequirements() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <h1>Requirements</h1>
                        </Col>
                        <Col>
                            <Tabs
                                dafaultActiveKey="List"
                                id="list-tab"
                            >   
                                <Tab eventKey="List" title="List">
                                    <h1>CORE</h1>
                                    <ul>
                                        <li>CPSC 201</li>
                                        <li>CPSC 202/ MATH 224</li>
                                        <li>CPSC 223</li>
                                        <li>CPSC 323</li>
                                        <li>CPSC 365 / CPSC 366 / CPSC 368</li>
                                    </ul>
                                    <h1>Electives</h1>
                                    <p>The field of computer science has broadened substantially in the last few decades and the Computer Science department advises its majors to choose intermediate and advanced electives covering the breadth of computer science,
                                        including theoretical computer science; computer systems and languages (e.g., database, networking, operating systems, programming languages, and systems security);
                                        and computer applications (e.g., artificial intelligence, computer graphics, computer vision, human-computer interactions, machine learning, natural language processing, and robotics).</p>
                                    <h2>Likely</h2>
                                    <ul>
                                        <li>LING 385</li>
                                        <li>NSCI 258</li>
                                    </ul>
                                    <h2>Popular</h2>
                                    <ul>
                                        <li>CPSC 370</li>
                                        <li>CPSC 419</li>
                                    </ul>
                                    <h1>SENIOR REQUIREMENT</h1>
                                    <ul>
                                        <li>CPSC 490</li>
                                    </ul>
                                </Tab>
                                <Tab eventKey="Graph" title="Graph">
                                    <h1>INSERT GRAPH VIEW HERE</h1>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default MajorRequirements;