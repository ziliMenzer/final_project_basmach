import React from 'react';
import { useNavigate } from 'react-router-dom';
import './routeRegister.css'

const RouteRegister = () => {
    const nav = useNavigate();

    const onTeacher = () => {
        nav("/registerTeacher")
    }

    const onStudent = () => {
        nav("/register")
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <div className=''>
                    <button onClick={onTeacher} className='teacher-btn'></button>
                    <h2 className='text-center'>מורה</h2>
                </div>
                <div className=''>
                    <button onClick={onStudent} className='student-btn'></button>
                    <h2 className='text-center'>תלמיד</h2>
                </div>
            </div>
        </div>
    )
}

export default RouteRegister;