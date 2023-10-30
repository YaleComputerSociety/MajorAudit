import React from "react";
import { Col, Row} from "react-bootstrap";
import Course from "./Course";
import DegreeData from "../data/DegreeData.json";

function DegreeRow() {
    const Data = [
        {
            course: "CPSC 223",
            title: "Data Structures & Programming Techniques",
            grade: "A",
            credits: "1",
            semester: "Fall 2022",
            key: "1",
        },
        {
            course: "CPSC 365",
            title: "Algorithms",
            grade: "A",
            credits: "1",
            semester: "Fall 2022",
            key: "1",
        }
    ];

    return (
        <>
            {Data.map(row => (
                <div className="degree-row">
                    <Row>
                        <Col>
                            <Course course={row.course} />
                        </Col>
                        <Col>
                            <h1>{row.title}</h1>
                        </Col>
                        <Col>
                            <h1>{row.grade}</h1>
                        </Col>
                        <Col>
                            <h1>{row.credits}</h1>
                        </Col>
                        <Col>
                            <h1>{row.semester}</h1>
                        </Col>
                    </Row>
                </div>
            ))}
        </>
    );
};

export default DegreeRow;