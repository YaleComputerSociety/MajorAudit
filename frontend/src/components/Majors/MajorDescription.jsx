import React from "react";
import Card from 'react-bootstrap/Card';
import { Row, Col, Nav } from 'react-bootstrap';

function MajorDescription() {
    const description = "The Department of Computer Science offers both B.S. and B.A. degree programs, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major. The Computer Science and combined major programs share a common core of five computer science courses. The first is CPSC 201, a survey that demonstrates the breadth and depth of the field to students who have taken the equivalent of an introductory programming course. The remaining core courses cover discrete mathematics (CPSC 202 or MATH 244), data structures (CPSC 223), systems programming and computer architecture (CPSC 323), and algorithm analysis and design CPSC 365, 366 or 368. Only one of CPSC 365, 366, and 368 may be taken for major credit. Together these courses include the material that every major should know. The core courses are supplemented by electives (and, for a combined major, core courses in the other discipline) that offer great flexibility in tailoring a program to each student's interests. The capstone is the senior project (CPSC 490), through which students experience the challenges and rewards of original research under the guidance of a faculty adviser. Prospective majors are encouraged to discuss their programs with the director of undergraduate studies (DUS) as early as possible.// Add code to grab Major Description from Backend.";
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h1>Description</h1>
                </Card.Title>
                <Card.Text>
                    <p>{description}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default MajorDescription;