import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import StudentHome from './student_comps/studentHome'
import Logout from './general_comps/logout'

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

                <header className='p-2 container bg-warning'>
                    <Link to="/">Home </Link> 
                    <Link to="/login">login </Link> 
                    <Link to="/register">register </Link> 
                    <Link to="/registerTeacher">register Teacher</Link> 
                    <Link to="/allTeachersList">AllTeachersList </Link> 
                </header>
                {/* outlet */}
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path='allTeachersList' element={<AllTeachersList />} />
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
