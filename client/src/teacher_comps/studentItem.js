import React, { useState } from 'react'
import EditStudent from './editStudent';
import "./studentItem.css"
export default function StudentItem(props) {
    let student = props.item;
    let onStatusChange = props.onStatusChange;
    const [showModal, setShowModal] = useState(false);
    // const [statusModal, setStatusModal] = useState(false);
    const [status, setStatus] = useState(student.status);
    const [teacherId, setTeacherId] = useState(student.teacher_id);
    const changeStatus = () => {
        let newStatus;

        if (student.status === "waiting") {
            if (window.confirm(`האם תרצה ללמד את ${student.first_name} ${student.last_name}`)) {
                newStatus = "active";
            } else {
                setTeacherId(null);
                return; // Exit the function without making the API call
            }
        } else if (student.status === "active") {
            newStatus = "un-active";
        } else if (student.status === "un-active") {
            newStatus = "active";
        }

        const updatedStudent = {
            user_id: student.user_id,
            status: newStatus,
            teacher_id: teacherId,
        };

        console.log(updatedStudent);
        onStatusChange(updatedStudent);
    }

    return (
        <div className="iphone-contact-list">
            <div className="contact-details">
                <h2>שם: {student.first_name} {student.last_name}</h2>
                <p>מספר טלפון: {student.phone}</p>
                <p>מספר שיעורים: {student.number_of_lessons}</p>
            </div>
            <div className="buttons">
                {showModal && (
                    <EditStudent
                        student={student}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                <button className="btn p-2" onClick={() => setShowModal(true)}>
                    עדכן התקדמות תלמיד
                </button>
                <button className="btn p-2" onClick={changeStatus}>
                    שנה סטטוס
                </button>
            </div>
        </div>
    );
};
