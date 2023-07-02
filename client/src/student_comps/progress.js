import React, { useContext } from 'react';
import { AppContext } from '../context/userProvider';
import "./progress.scss";
import { keyframes } from "styled-components";

const Progress = () => {
  const { user } = useContext(AppContext);
  const subjectsArray = user.subjects_array;
  const subjects_array_hebrew = ["תמרורים", "פניות", "מהירות", "תפעול הרכב", "דרך בין-עירונית", "זכויות קדימה"]

  return (
    <div className='container'>
      <div className='smaller-container'>
        {Object.keys(subjectsArray).map((subject, index) => (
          <div key={index} className='m-4'>
            <h3>{subjects_array_hebrew[index]}:</h3>
            <div class="progress2 progress-moved">
              <div class="progress-bar2" style={{
                width: `${subjectsArray[subject] * 10}%`,
                backgroundColor: '#EF476F',
                animation: `load 6s`,

              }} >
                <style>{`
            @keyframes load {
              0%   { width: 5%; backgroundColor: #F9BCCA;}
              100% { width: ${subjectsArray[subject] * 10}; backgroundColor: #EF476F; }
            }
        `}</style>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Progress;
