import React from "react";
import { Card, Container, Row, Col, Tab, Badge, Stack } from "react-bootstrap";
import SkillBadge from "../SkillBadge";
import styles from "./GraduationOverview.module.css";

function GraduationOverview() {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Container>
                    <Row>
                        <h1 className={styles.font1}>
                            Overview
                        </h1>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <div>
                                <h3 className={styles.font2}>
                                    MAJOR
                                </h3>
                            </div>
                            <div className="ms-auto">
                                <h3 className={styles.font2}>
                                    5/12
                                </h3>
                            </div>
                        </Stack>
                    </Row>
                    <Row>
                        <h4>
                            <Badge
                                pill
                                bg
                                style={
                                    {
                                        backgroundColor: "#e1e9f8"
                                    }
                                }
                                className={styles.majorBadge}>COGNITIVE SCIENCE
                            </Badge>
                        </h4>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                PREQ
                            </b>
                        </Col>
                        <Col>
                            <b>
                                BREADTH
                            </b>
                        </Col>
                        <Col>
                            <b>
                                DEPTH
                            </b>
                        </Col>
                        <Col>
                            <b>
                                SKILLS
                            </b>
                        </Col>
                        <Col>
                            <b>
                                JUN
                            </b>
                        </Col>
                        <Col>
                            <b>
                                SEN
                            </b>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                1/1
                            </b>
                        </Col>
                        <Col>
                            <b>
                                1/4
                            </b>
                        </Col>
                        <Col>
                            <b>
                                2/6
                            </b>
                        </Col>
                        <Col>
                            <b>
                                1/1
                            </b>
                        </Col>
                        <Col>
                            <b>
                                0/0.5
                            </b>
                        </Col>
                        <Col>
                            <b>
                                0/0.5
                            </b>
                        </Col>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <div>
                                <h3 className={styles.font2}>
                                    DISTRIBUTIONS
                                </h3>
                            </div>
                            <div className="ms-auto">
                                <h3 className={styles.font2}>
                                    7/13
                                </h3>
                            </div>
                        </Stack>
                    </Row>
                    <Row>
                        <h4 className={styles.font5}>
                            AREAS
                        </h4>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                <SkillBadge text="Hu" />
                            </b>
                        </Col>
                        <Col>
                            <b>
                                <SkillBadge text="So" />
                            </b>
                        </Col>
                        <Col>
                            <b>
                                <SkillBadge text="Sc" />
                            </b>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                2/2
                            </b>
                        </Col>
                        <Col>
                            <b>
                                0/2
                            </b>
                        </Col>
                        <Col>
                            <b>
                                1/2
                            </b>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <h4 className={styles.font5}>
                            SKILLS
                        </h4>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                <SkillBadge text="QR" />
                            </b>
                        </Col>
                        <Col>
                            <b>
                                <SkillBadge text="WR" />
                            </b>
                        </Col>
                        <Col>
                            <b>
                                <SkillBadge text="L" />
                            </b>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>
                                2/2
                            </b>
                        </Col>
                        <Col>
                            <b>
                                0/2
                            </b>
                        </Col>
                        <Col>
                            <b>
                                2/3
                            </b>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default GraduationOverview;