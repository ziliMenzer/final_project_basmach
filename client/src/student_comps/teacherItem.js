import React, { useState, useContext } from 'react'
import { AppContext } from '../context/userProvider';
import { API_URL, doApiMethodTokenNotStringify } from '../services/apiService';
import './teacherItem.css'

export default function TeacherItem(props) {
  const { user, setUser } = useContext(AppContext);
  const item = props.item;
  const [showMessage, setShowMessage] = useState(false);
  const addStudent = async () => {
    if (user.teacher_id !== null) {
      alert("עליך לעזוב את המורה הקיים לפני שתצטרף למורה חדש");
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
    <div className='teacher-item my-3'>
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
