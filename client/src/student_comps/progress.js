import React, { useContext } from 'react'
import { AppContext } from '../context/userProvider';

export default function Progress() {
    const user = useContext(AppContext);
    console.log(user.number_of_lessons);

    return (
        <div className='container'>
            <h2>You passed {user.number_of_lessons} lessons</h2>
            <h2>You passed</h2>
            <div className='row g-2'>
                {/* {teachersList.map(item => {
                    return (
                        <TeacherItem key={item._id} item={item} />
                    )
                })}
                {teachersList.length<1 && <h2>Loading....</h2>} */}
            </div>
        </div>
    )
}
