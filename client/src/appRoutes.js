import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import StudentHome from './student_comps/studentHome'
import Header from './layout/header'
import Logout from './general_comps/logout'
import Footer from './layout/footer'

export default function AppRoutes() {
    const [user, setUser] = useState({});
    const updateUserDetails = (updatedDetails) => {
        setUser((prevUser) => ({ ...prevUser, ...updatedDetails }));
      };
    return (
        <BrowserRouter>

            <AppContext.Provider value={{
                user,setUser,
                updateUserDetails
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
                    <Route path='allTeachersList' element={<AllTeachersList />} />
                    <Route path='studentHome' element={<StudentHome/>}/>
                    {/* <Route path="/counter" element={<Counter />} />
                    <Route path="/pixa/:searchQ" element={<AppPixa />} />
                    <Route path="/casino" element={<AppCasino />} />
                    <Route path="/cars" element={<CarsList />} /> */}
                </Routes>
                {/* outlet */}
                    <Footer></Footer>
            </AppContext.Provider>
        </BrowserRouter>
    )
}
