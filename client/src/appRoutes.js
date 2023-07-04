import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import StudentHome from './student_comps/studentHome'
import Logout from './general_comps/logout'
import RouteRegister from './general_comps/routeRegister'
import SignUp from './student_comps/register'
import RegisterUser from './teacher_comps/registerUser'
import SignUpTeacher from './teacher_comps/resgisterTeacher'
import Header from './layout/header'
import Footer from './layout/footer'

export default function AppRoutes() {
    const [user, setUser] = useState({});
    const [myStudents, setMyStudents] = useState([]);
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user, setUser,
                myStudents, setMyStudents
            }}>
                {/* <Header/> */}

                {/* <header className='p-2 container bg-warning'>
                    <Link to="/">Home </Link>
                    <Link to="/login">login </Link>
                    <Link to="/register">register </Link>
                    <Link to="/registerUser">registerTeacher</Link>
                    <Link to="/allTeachersList">AllTeachersList </Link>
                </header> */}
                {/* outlet */}
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path='allTeachersList' element={<AllTeachersList />} />
                    <Route path="/routeRegister" element={<RouteRegister />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/registerUser" element={<RegisterUser />} />
                    <Route path="/registerTeacher" element={<SignUpTeacher />} />
                </Routes>
                <Footer />
            </AppContext.Provider>
        </BrowserRouter>
    )
}
