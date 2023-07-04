import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import Logout from './general_comps/logout'
import RouteRegister from './general_comps/routeRegister'
import SignUp from './student_comps/register'
import Header from './layout/header'
import Footer from './layout/footer'
import MyInfo from './student_comps/myInfo'
import Progress from './student_comps/progress'
import Calendar from './events_comps/calendar'
import AllStudents from './teacher_comps/allStudents'
import UsersList from './admin_comps/userList'
import RegisterTeacher from './teacher_comps/registerTeacher'

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
                    <Route index element={<Login />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/logout" element={<Logout />} />
                    <Route path='/allTeachersList' element={<AllTeachersList />} />
                    <Route path="/routeRegister" element={<RouteRegister />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/registerUser" element={< RegisterTeacher />} />
                    {/* <Route path="/registerTeacher" element={<SignUpTeacher />} /> */}
                    <Route path="/myInfo" element={<MyInfo />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/allStudents" element={<AllStudents />} />
                    <Route path="/usersList" element={<UsersList />} />
                </Routes>
                <Footer />
            </AppContext.Provider>
        </BrowserRouter>
    )
}