import  { useContext } from 'react';
import { AppContext } from '../context/userProvider';
import "./progress.scss";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Progress = () => {
  const { user } = useContext(AppContext);

  const subjectsArray = user.subjects_array;
  let total = 0;
  Object.keys(subjectsArray).map(item => {
    total += parseInt(subjectsArray[item] * 10);
  });
  total = Math.round(total / 6);
  console.log(total)
  const subjects_array_hebrew = ["תמרורים", "פניות", "מהירות", "תפעול הרכב", "דרך בין-עירונית", "זכויות קדימה"]

  return (
    <div>
      <div className='container'>
      <h2>סה"כ: {total}%</h2>
      <ProgressBar>
        <ProgressBar now={total}  label={`${total}%`} style={{
          backgroundColor: '#EF476F',
          animation: `load 6s`,
        }} />
        {/* <ProgressBar now={(100 - total)} key={2} style={{ backgroundColor: "grey" }} /> */}
      </ProgressBar>
      <br />
      {/* <ProgressBar variant='danger' now={total} label={`${total}%`} /> */}
      <div className='smaller-container'>
        {Object.keys(subjectsArray).map((subject, index) => (
          <div key={index} className='m-4'>

            <h3>{subjects_array_hebrew[index]}:</h3>
            <div className="progress2 progress-moved">
              <div className="progress-bar2" style={{
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
    </div>
  );

};

export default Progress;
