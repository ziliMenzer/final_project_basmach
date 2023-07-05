import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/userProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/logo.png";
export default function Header() {
    const { user } = useContext(AppContext);
    return (
        <Navbar expand="lg" className="bg-dark navbar-dark text-light">
            <Container>
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {user && user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/usersList">כל המשתמשים</Link>
                                    </li>
                                )}
                                {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/allStudents">התלמידים שלי</Link>
                                    </li>
                                )}
                                {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/calendar">יומן</Link>
                                    </li>
                                )}
                               
                                   {user && user.role === 'student' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/allTeachersList">כל המורים</Link>
                                    </li>
                                )}
                                {user && user.role === 'student' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/progress">ההתקדמות שלי</Link>
                                    </li>
                                )}
                                {user && user.role === 'student' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/calendar">יומן</Link>
                                    </li>
                                )}
                                {user && user.role === 'student' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/myInfo">פרטים אישיים</Link>
                                    </li>
                                )}
                              {user!="null"  && user!={}&& (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">התנתק</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              
                <Navbar.Brand href="/"><img src={Logo} alt="logo" id="logo" style={{height:"60px",width:"60px"}}></img></Navbar.Brand>
            </Container>
        </Navbar>
    );
}

