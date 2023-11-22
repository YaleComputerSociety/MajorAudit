import { React, useState } from "react";
import { Card, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

function GraduationDistributions() {
  const [yearSelected, setYear] = useState(0);

  var yearButtonVariants = ["primary", "secondary", "secondary", "secondary"];

  const yearButtonPressed = (year) => {
    yearButtonVariants = ["secondary", "secondary", "secondary", "secondary"];
    yearButtonVariants[year] = "primary";
    setYear(year);
    console.log(yearButtonVariants);
    console.log("a " + yearSelected);
  };

  const changeYear = (event) => {
    setYear(event);
  };
  return (
    <Card style={{ width: "50rem" }}>
      <Card.Title>Distributions</Card.Title>
      <Card.Body>
        <ButtonGroup aria-label="year-button-group">
          <Button
            variant={yearButtonVariants[0]}
            onClick={() => yearButtonPressed(0)}
          >
            First Year
          </Button>
          <Button
            variant={yearButtonVariants[1]}
            onClick={() => yearButtonPressed(1)}
          >
            Sophomore
          </Button>
          <Button
            variant={yearButtonVariants[2]}
            onClick={() => yearButtonPressed(2)}
          >
            Junior
          </Button>
          <Button
            variant={yearButtonVariants[3]}
            onClick={() => yearButtonPressed(3)}
          >
            Senior
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default GraduationDistributions;