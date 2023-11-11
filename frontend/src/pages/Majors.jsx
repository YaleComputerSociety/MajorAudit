import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MajorTitle from "../components/Majors/MajorTitle";
import MajorDescription from "../components/Majors/MajorDescription";
import MajorRequirements from "../components/Majors/MajorRequirements";

function Majors() {

    return (
        <section className="Majors" id="majors">
            <Container>
                <Col>
                    <Row>
                        <MajorTitle />
                    </Row>
                    <Row>
                        <MajorRequirements />
                    </Row>
                </Col>
                <Col>
                    <MajorDescription />
                </Col>
            </Container>
        </section>

    );
};

export default Majors;