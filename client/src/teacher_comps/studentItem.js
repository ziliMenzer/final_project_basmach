import React, { useState } from 'react'
import EditStudent from './editStudent';

export default function StudentItme(props) {
    const [showModal, setShowModal] = useState(false);
    let item = props.item;
    // const addStudent = () => {

    // }
    return (
        <div className='col-md-6 bg-light'>
            {showModal &&
                <EditStudent
                    student={item}
                    showModal={showModal}
                    setShowModal={setShowModal}
                // onUpdate={handleEventUpdate}
                // onDelete={handleEventDelete}
                // onClose={handleCloseModal}
                />
            }
            <h2>name: {item.first_name} {item.last_name}</h2>
            <p>phone: {item.phone}</p>
            <h2>number of lessons: {item.number_of_lessons}</h2>
            <div className='m-2 p-2 d-flex justify-content-center text-center align-items-center'>
                <button className='btn btn-dark ' onClick={() => setShowModal(true)}>ערוך תלמיד</button>
            </div>


            {/* <h2>rating: {item.rating}</h2> */}
            {/* <button onClick={()=>{
            <div className='col-md-4 bg-light'>האם את/ה בטוח/ה שתרצה ללמוד אצל: {item.first_name} {item.last_name}
            <button onClick={addStudent}>אישור</button>
            </div>     
        }}>בחירת מורה</button> */}
        </div>
    )
}
