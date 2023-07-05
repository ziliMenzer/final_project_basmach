import React, { useState, useContext } from 'react'
import { AppContext } from '../context/userProvider';
import { Alert } from 'react-bootstrap';
import { API_URL, doApiMethodTokenNotStringify } from '../services/apiService';
import './teacherItem.css'

export default function TeacherItem(props) {
  const { user } = useContext(AppContext);
  const item = props.item;
  const [showMessage, setShowMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [teacherId,setTeacherId] =useState(user.teacher_id)
  const addStudent = async () => {
    if (teacherId == null) {

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
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log("hdjs")
      setShowAlert(true);
    }
    setShowMessage(false);
  }
  return (
    <div className='teacher-item my-3'>
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          {"עליך לעזוב את המורה הקיים לפני שתצטרף למורה חדש"}
        </Alert>
      )}

      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h3>{item.first_name} {item.last_name}</h3>
          <p className='p-0 m-0'>סוג רישיון: {item.license_type}</p>
          <p className='p-0 m-0'>דרוג: {item.rating}</p>
        </div>
        <button className='btn-teacher py-2 px-5' onClick={() => setShowMessage(true)}>בחירת המורה</button>
      </div>
      {showMessage && <div>האם את/ה בטוח/ה שתרצה ללמוד אצל: {item.first_name} {item.last_name}
        <button className='btn-teacher' onClick={addStudent}>אישור</button>
      </div>}
    </div>
  )
}