import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const nav = useNavigate();

  const onLogin = () => {
    nav("/login");
  }

  const onRegister = () => {
    nav("/routeRegister");
  }


  return (
    <div className='container'>
      {/* <div className='d-flex justify-content-between'> */}
        <div className='d-flex justify-content-end'>
          <button onClick={onLogin} className='login-btn'>התחברות</button>
        </div>
        <h1 className='head'>ברוכים הבאים ל drivy</h1>
      {/* </div> */}
      <div className='text-center'> 
        <p> אין לך חשבון? <button onClick={onRegister} className='register-btn'>הרשם</button></p>
      </div>
    </div>
  );
};

export default Home;

