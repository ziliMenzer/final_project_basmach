import React, { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from "../src/context/userProvider"
import Login from './general_comps/login'
import Home from './general_comps/home'
import AllTeachersList from './student_comps/allTeachersList'
import StudentHome from './student_comps/studentHome'
import Logout from './general_comps/logout'
import Calendar from './events_comps/calendar'
import AddEvent from './events_comps/addEvent'
import Header from './layout/header'
import UsersList from './admin_comps/userList'
import AllStudents from './teacher_comps/allStudents'
import FilterTeachers from './student_comps/filterTeachers'
import Progress from './student_comps/progress'
// import Header from './general_comps/navbar'
import MyInfo from './student_comps/myInfo'
import Footer from './layout/footer'

export default function AppRoutes() {
    const [user, setUser] = useState({});
    const [myStudents, setMyStudents] = useState([]);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Update local storage whenever user data changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    return (
        // <BrowserRouter>

        //     <AppContext.Provider value={{
        //         user,setUser,
        //         myStudents,setMyStudents
        //     }}>


        <div>

            <BrowserRouter>
                <AppContext.Provider value={{
                    user, setUser,
                    myStudents, setMyStudents
                }}>
                    <Header/>
                    <Routes>
                        <Route index element={<Login />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path='allTeachersList' element={<AllTeachersList />} />
                        <Route path='addEvent' element={<AddEvent />} />
                        <Route path='/usersList' element={<UsersList />} />
                        <Route path='/allStudents' element={<AllStudents />} />
                        <Route path='/filterTeachers' element={<FilterTeachers />} />
                        <Route path='/progress' element={<Progress />} />
                        <Route path='/myInfo' element={<MyInfo />} />
                        {/* <Route path="/counter" element={<Counter />} />
                    <Route path="/pixa/:searchQ" element={<AppPixa />} />
                    <Route path="/casino" element={<AppCasino />} />
                    <Route path="/cars" element={<CarsList />} /> */}
                    </Routes>
                    <Footer/>
                </AppContext.Provider>
            </BrowserRouter>
        </div>
        // <footer className='p-2 container-fluid bg-danger'>footer</footer>

        // </BrowserRouter>
    )
}
