import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import DegreeRow from "./DegreeRow";


function DegreeDropdown() {
     const CustomToggle = ({ children, eventKey }) => {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );
        return (
            <button
                type="button"
                style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    color: 'black'
                }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    };

    return (
        <>
            <Accordion>
                <Card>
                    <Card.Header>
                        <CustomToggle eventKey = "0">Degree in Bachelor of Science</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Row>
                                <DegreeRow />
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};

export default DegreeDropdown;