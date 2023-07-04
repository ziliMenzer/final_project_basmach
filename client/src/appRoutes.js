import React, { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
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
import WaitForConfirmation from './teacher_comps/waitingForConfirmation'

export default function AppRoutes() {
    const [user, setUser] = useState({});
    const [myStudents, setMyStudents] = useState([]);
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user, setUser,
                myStudents, setMyStudents
            }}>
                <Header />
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path='/allTeachersList' element={<AllTeachersList />} />
                    <Route path="/routeRegister" element={<RouteRegister />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/registerTeacher" element={< RegisterTeacher />} />
                    <Route path="/confirmation" element={<WaitForConfirmation />} />
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