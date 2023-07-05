import { React, Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../../src/context/userProvider"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import "../Assets/UserSection/Styles/style.css";
import Logo from "../Assets/Main/icons/logo.png";
import "./headerStudent.css";
import { link } from "joi";

export default function HeaderStudent()  {
  const links=["הפרטים שלי", "התקדמות", "שיעורים", "יציאה"];
    return (

        <Navbar expand="lg" className="bg-dark navbar-dark text-light">
        <Container>
            <Navbar.Brand href="/"><img src={Logo} alt="logo" id="logo"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link className="text-light" href="/myInfo">{links[0]}</Nav.Link>
                <Nav.Link className="text-light" href="/progress">{links[1]}</Nav.Link>
                <Nav.Link className="text-light" href="/calendar">{links[2]}</Nav.Link>
                <Nav.Link className="text-light" href="/logout">{links[3]}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
  
}