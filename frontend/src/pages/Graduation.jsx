import React from 'react';
import GraduationDistributions from '../components/Graduation/GraduationDistributions';
import GraduationOverview from '../components/Graduation/GraduationOverview';
import { Container, Row, Col } from "react-bootstrap";

function Graduation() {
    return (
        <section classname='Graduation' id='graduation'>
            <Container>
                <Row>
                    <Col md="8">
                        <GraduationOverview></GraduationOverview>
                    </Col>
                    <Col md="10">
                        <GraduationDistributions></GraduationDistributions>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Graduation;