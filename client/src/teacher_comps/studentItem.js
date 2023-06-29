import React from 'react'

export default function StudentItme(props) {
    let item = props.item;
    const addStudent = () => {

    }
    return (
        <div className='col-md-6 bg-light'>
            <h2>name: {item.first_name} {item.last_name}</h2>
            <h2>number of lessons: {item.number_of_lessons}</h2>
            {/* <h2>rating: {item.rating}</h2> */}
            {/* <button onClick={()=>{
            <div className='col-md-4 bg-light'>האם את/ה בטוח/ה שתרצה ללמוד אצל: {item.first_name} {item.last_name}
            <button onClick={addStudent}>אישור</button>
            </div>     
        }}>בחירת מורה</button> */}
        </div>
    )
}
