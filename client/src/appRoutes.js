import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import Header from './layout/header'
import Logout from './general_comps/logout'
import SignUp from './student_comps/register'
import SignUpTeacher from './teacher_comps/resgisterTeacher'
import RegisterUser from './teacher_comps/registerUser'

export default function AppRoutes() {
    const [user, setUser] = useState({})
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user,setUser
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
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/registerTeacher" element={<RegisterUser />} />
                    <Route path='/allTeachersList' element={<AllTeachersList/>}/>
                </Routes>
                {/* outlet */}
                <footer className='p-2 container bg-danger'>footer</footer>
            </AppContext.Provider>
        </BrowserRouter>
    )
}
