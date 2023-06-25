import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import SignUp from './student_comps/register'
import Home from './general_comps/home'

export default function AppRoutes() {
    const [user, setUser] = useState({})
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user: "avi"
            }}>

                <header className='p-2 container bg-warning'>
                    <Link to="/">Home </Link> 
                    <Link to="/login">login </Link> 
                    <Link to="/register">register </Link> 
                    <Link to="/counter">Counter </Link> 
                    <Link to="/pixa/cats">Pixa </Link> 
                </header>
                {/* outlet */}
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    {/* <Route path="/counter" element={<Counter />} />
                    <Route path="/pixa/:searchQ" element={<AppPixa />} />
                    <Route path="/casino" element={<AppCasino />} />
                    <Route path="/cars" element={<CarsList />} /> */}
                </Routes>
                {/* outlet */}
                <footer className='p-2 container bg-danger'>footer</footer>
            </AppContext.Provider>
        </BrowserRouter>
    )
}
