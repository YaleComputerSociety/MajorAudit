import React from "react";
import { Card } from "react-bootstrap";

function GraduationOverview() {
    return (
        <Card style={{ width: "50rem" }}>
            <Card.Title>
                <h1>
                    Overview
                </h1>
            </Card.Title>
            <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
    );
}

export default GraduationOverview;