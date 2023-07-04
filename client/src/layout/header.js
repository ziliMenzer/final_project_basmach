import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/userProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../Assets/Main/icons/logo.png";
export default function Header() {
     const { user } = useContext(AppContext);
     return (
         <Navbar expand="lg" className="bg-dark navbar-dark text-light">
            <Container>
             <Navbar.Brand href="/"><img src={Logo} alt="logo" id="logo" style={{height:"60px",width:"60px"}}></img></Navbar.Brand>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="me-auto">
                         <div className="collapse navbar-collapse" id="navbarNav">
                             <ul className="navbar-nav">
                                 {user && user.role === 'admin' && (
                                     <li className="nav-item">
                                         <Link className="nav-link" to="/usersList">Admin Page</Link>
                                    </li>
                                )}
                                 {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                         <Link className="nav-link" to="/allStudents">בית</Link>
                                    </li>
                                 )}
                                 {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                     <Link className="nav-link" to="/calendar">שיעורים</Link>
                                    </li>
                                 )}
                                 {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                     <Link className="nav-link" to="/editTeacher">הפרטים שלי</Link>
                                    </li>
                                 )}
                                {user && user.role === 'teacher' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">יציאה</Link>
                                    </li>
                                 )}
                                 {user && user.role === 'student' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/progress">בית</Link>
                                    </li>
                                 )}
                                 {user && user.role === 'student' && (
                                     <li className="nav-item">
                                         <Link className="nav-link" to="/calendar">שיעורים</Link>
                                     </li>
                                 )}
                                {user && user.role === 'student' && (
                                 <li className="nav-item">
                                     <Link className="nav-link" to="/myInfo">הפרטים שלי</Link>
                                 </li>
                                 )}
                                {user && user.role === 'student' && (
                                 <li className="nav-item">
                                     <Link className="nav-link" to="/allTeachersList">רשימת מורים</Link>
                                    </li>
                                 )}
                             </ul>
                         </div>
                     </Nav>
                 </Navbar.Collapse>
             </Container>
         </Navbar>
     );
}
