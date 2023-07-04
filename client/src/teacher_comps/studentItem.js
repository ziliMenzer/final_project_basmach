import React, { useState } from 'react'
import EditStudent from './editStudent';

export default function StudentItem(props) {
    let student = props.item;
    let onStatusChange = props.onStatusChange;
    const [showModal, setShowModal] = useState(false);
    // const [statusModal, setStatusModal] = useState(false);
    const [status,setStatus] =useState(student.status);
    const [teacherId,setTeacherId] =useState(student.teacher_id);
    const changeStatus=()=>{
        if(student.status ==="waiting"){
            if(window.confirm(`האם תרצה ללמד את ${student.first_name} ${student.last_name}`)){
                    setStatus("active");
            }
            else{
                setTeacherId(null);
            }
        }
        else if(student.status ==="active"){
                console.log("this was un-active")
                setStatus("un-active");
        }
        else{
            console.log("here")
            setStatus("active");
        }
        const updatedStudent={
            user_id:student.user_id,
            status:status,
            teacher_id:teacherId
        }
        onStatusChange(updatedStudent);
    }

    return (
        <div className='col-md-6 bg-light'>
            {}
            {showModal &&
                <EditStudent
                    student={student}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            }
            <h2>name: {student.first_name} {student.last_name}</h2>
            <p>phone: {student.phone}</p>
            <h2>number of lessons: {student.number_of_lessons}</h2>
            <div className='m-2 p-2 d-flex justify-content-center text-center align-items-center'>
                <button className='btn btn-dark ' onClick={() => setShowModal(true)}>ערוך התקדמות</button>
                <button className='btn btn-dark ' onClick={changeStatus}>שינוי סטטוס תלמיד</button>
            </div>
        </div>
    )
}
