import React, { useState,useEffect } from 'react'
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
import UsersList from './admin_comps/userList'
import AllStudents from './teacher_comps/allStudents'
import FilterTeachers from './student_comps/filterTeachers'
import Progress from './student_comps/progress'

export default function AppRoutes() {
    const [user, setUser] = useState({});
    const [myStudents,setMyStudents]=useState([]);
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user,setUser,
                myStudents,setMyStudents
            }}>
                <Header/>

                {/* <header className='p-2 container bg-warning'>
                    <Link to="/">Home</Link>
                    <Link to="/login">login</Link>
                    <Link to="/allTeachersList">AllTeachersList</Link>
                    <Link to="/pixa/cats">Pixa</Link>
                    <Link to="/cars">Cars</Link>
                    <Link to="/casino">Casino</Link>
                </header> */}
                {/* outlet */}
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path='allTeachersList' element={<AllTeachersList />} />
                    <Route path='addEvent' element={<AddEvent />} />
                    <Route path='/usersList' element={<UsersList />} />
                    <Route path='/allStudents' element={<AllStudents />} />
                    <Route path='/filterTeachers' element={<FilterTeachers />} />
                    <Route path='/progress' element={<Progress />} />
                    {/* <Route path="/counter" element={<Counter />} />
                    <Route path="/pixa/:searchQ" element={<AppPixa />} />
                    <Route path="/casino" element={<AppCasino />} />
                    <Route path="/cars" element={<CarsList />} /> */}
                </Routes>
                {/* outlet */}
                <footer className='p-2 container-fluid bg-danger'>footer</footer>
            </AppContext.Provider>
        </BrowserRouter>
    )
}
