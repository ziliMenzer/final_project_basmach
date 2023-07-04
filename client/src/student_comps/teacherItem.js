import React, { useState, useContext } from 'react'
import { AppContext } from '../context/userProvider';
import { API_URL, doApiMethodTokenNotStringify } from '../services/apiService';
import './teacherItem.css'
import { Alert } from 'react-bootstrap';
export default function TeacherItem(props) {
  const { user, setUser } = useContext(AppContext);
  const item = props.item;
  const [showMessage, setShowMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const addStudent = async () => {
    if (user.teacher_id !== null) {
      setShowAlert(true);
    }
    const updatedStudent = {
      user_id: user.user_id,
      status: "waiting",
      teacher_id: item.user_id
    }
    try {
      console.log(user.user_id);
      let url = API_URL + `/students/${user.user_id}`;
      const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedStudent);
      console.log(data);
      //setUser()
      //setMyStudents(updatedMyStudents);
    }
    catch (err) {
      console.log(err);
    }
    setShowMessage(false);

  }
  return (
    <div className='col-md-4 bg-light'>
       {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          {"עליך לעזוב את המורה הקיים לפני שתצטרף למורה חדש"}
        </Alert>
      )}
      <h2>name: {item.first_name} {item.last_name}</h2>
      <h2>license type: {item.license_type}</h2>
      <h2>rating: {item.rating}</h2>
      <button onClick={() => setShowMessage(true)}>בחירת המורה</button>
      {showMessage && <div>האם את/ה בטוח/ה שתרצה ללמוד אצל: {item.first_name} {item.last_name}
        <button className='btn-teacher' onClick={addStudent}>אישור</button>
      </div>}
    </div>
  )
}
