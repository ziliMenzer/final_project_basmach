import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from "../services/apiService";
import { AppContext } from '../context/userProvider';


export default function Logout () {
    const nav = useNavigate();
    const {setUser} =useContext(AppContext);
    useEffect(() => {
        disconnected();
    }, [])
    const disconnected = async () => {
        localStorage.removeItem(TOKEN_NAME);
        setUser(null);
        nav('/')
    }
    return (
        <></>
    )
}

