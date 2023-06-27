import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/userProvider'
export default function StudentHome() {
    // const user = useContext(AppContext);
    
    return (
        <div className='container mx-auto text-center'>
            <h2>Hello user</h2>
            <div className='event'>
                <p>your next class{}</p>
                {console.log("k")}
            </div>
            <div className='debt'>
                <p>my debt</p>
            </div>
        </div>
    )
}