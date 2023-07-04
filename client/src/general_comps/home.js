import Header from '../layout/header'
import { AppContext } from '../context/userProvider';
import React, { useContext } from 'react';

export default function Home() {
  return (
    <div>
        <Header/>
      
      <div className='container text-center'>
        home
      </div>
    </div>
  ) 
}
