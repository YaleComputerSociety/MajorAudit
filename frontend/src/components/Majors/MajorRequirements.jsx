import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import { Row, Col, Nav } from 'react-bootstrap';
import Course from '../Courses/Course';

function MajorRequirements() {
    const electiveDescription = 'The field of computer science has broadened substantially in the last few decades and the Computer Science department advises its majors to choose intermediate and advanced electives covering the breadth of computer science, including theoretical computer science; computer systems and languages(e.g., database, networking, operating systems, programming languages, and systems security); and computer applications (e.g., artificial intelligence, computer graphics, computer vision, human-computer interactions, machine learning, natural language processing, and robotics).'; // add in code for backend
    const courses = [
         "CPSC 201", "CPSC 202/MATH 244", "CPSC 223", "CPSC 323", "CPSC 365 / CPSC 366 / CPSC 368" 
    ]; // add in code for backend
    const seniorRequirement = [
        "CPSC 490"
    ]; // add in code for backend

    const likely = [
        "LING 385", "NSCI 258"
    ]; // add in code for backend

    const popular = [
        "CPSC 370", "CPSC 419"
    ]; // add in code for backend

    return (
        <Card>
            <Card.Body>
                <Tab.Container id="tabs" defaultActiveKey="first">
                    <Row>
                        <Col><h1>Requirements</h1></Col>
                        <Col>
                            <Nav variant="pills" className="nav-pills" id="pills-tab">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">List View</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Graph View</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div className="requirements-tab">
                                <h1>CORE</h1>
                                <ul>
                                    {courses.map((course =>
                                        <Row>
                                            <Course course={course} />
                                        </Row>
                                    ))}
                                </ul>
                                <h1>Electives</h1>
                                <p>{electiveDescription}</p>
                                <h2>Likely</h2>
                                <ul>
                                    {likely.map((course =>
                                        <Row>
                                            <Course course={course} />
                                        </Row>
                                    ))}
                                </ul>
                                <h2>Popular</h2>
                                <ul>
                                    {popular.map((course =>
                                        <Row>
                                            <Course course={course} />
                                        </Row>
                                    ))}
                                </ul>
                                <h1>SENIOR REQUIREMENT</h1>
                                <ul>
                                    {seniorRequirement.map((course =>
                                        <Row>
                                            <Course course={course} />
                                        </Row>
                                    ))}
                                </ul>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <h1>INSERT GRAPH VIEW HERE</h1>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default MajorRequirements;