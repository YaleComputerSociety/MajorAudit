import React from 'react';
import GraduationDistributions from '../components/Graduation/GraduationDistributions';
import GraduationOverview from '../components/Graduation/GraduationOverview';
import { Container, Row, Col } from "react-bootstrap";

function Graduation() {
    return (
        <section classname='Graduation' id='graduation'>
            <Container>
                <Col>
                    <GraduationOverview></GraduationOverview>
                </Col>
                <Col>
                    <GraduationDistributions></GraduationDistributions>
                </Col>
            </Container>
        </section>
    );
}

export default Graduation;