import React, {useState} from "react";
import { Col, Row, Modal, Button, Container } from "react-bootstrap";
import CourseData from "../data/Courses.json";

// const Courses = [
//     {
//         title: "CPSC 223",
//         prereqs: "CPSC 201",
//         description: "blah blah blah",
//         id: "1",
//     }
// ];

const findCourse = (course) => {
    const values = CourseData[course];
    return values;
};

function Course({ course }) {
    const [courseData, setCourseData] = useState(null);
    const showCourse = (course) => setCourseData(course);
    const hideCourse = () => setCourseData(null);

    return (
        <>
            <Row>
                <div className="course-modal">
                    {courseData && (<CourseModal show={courseData} course={courseData} onClose={hideCourse} />)}
                </div>
                <div className="course-item">
                    <button onClick={() => { showCourse(findCourse(course)) }}>
                        <div className="course-title">
                            <h1>{course}</h1>
                        </div>
                    </button>
                    {console.log(findCourse(course)[0].title)}
                </div>
                {/* {Courses.map(course => (
                    <div className="course-item">
                        <button onClick={() => { showCourse(course) }}>
                            <div className="course-title">
                                <h1>{course.title}</h1>
                            </div>
                        </button>
                    </div>
                ))} */}
            </Row>
        </>
    );
};

function CourseModal({show, course, onClose}) {
    return (
        <Modal
            show = {show}
            onHide={onClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <Container>
                        <Row>
                            <h1>{course[0].title}</h1>
                        </Row>
                    </Container>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h1>{course[0].description}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Pre-Requisites: {course[0].prereqs}</h2>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} className="course-button">Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Course;