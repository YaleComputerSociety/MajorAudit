import React from "react";
import {useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
// import { HashLink } from 'react-router-hash-link';


function NavBar() {
    const [isDarkMode, setIsDarkMode] = useState('dark'); 
    
    const toggleMode = () => {
        if (isDarkMode === 'dark') {
            setIsDarkMode("light")
        } else {
            setIsDarkMode("dark")
        }
    };

    const setMode = () => {
        if (isDarkMode === 'dark') {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark");
        }
    };

    useEffect(() => {
        const colorMode = window.sessionStorage.getItem('color_mode');
        if (!colorMode) {
            window.sessionStorage.setItem('color_mode', isDarkMode);
        }
        setMode();
    });
    
    return (
        <section className="navigation" id="navigation">
            <Navbar expand="md">
                <Container>
                    <Navbar.Brand href="/">
                        <p>MajorAudit</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="navbar-toggler-icon"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <a onClick={toggleMode}>
                                <i className={isDarkMode === 'dark'? "bi bi-brightness-high" : "bi bi-moon" }></i>
                            </a>
                            <Nav.Link href="/" id='homeLink' className="navbar-link">Graduation</Nav.Link>
                            <Nav.Link href="/courses" id='coursesLink' className="navbar-link">Courses</Nav.Link>
                            <Nav.Link href="/majors" id='majorsLink' className="navbar-link">Majors</Nav.Link>
                            <Nav.Link href="/profile" id='profileLink' className="navbar-link">Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </section>
    );
};

export default NavBar;