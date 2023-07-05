import React, { useState, useEffect } from 'react'
import TeacherItem from './teacherItem';
import { doApiGet, API_URL, TOKEN_NAME } from '../services/apiService';
import './teacherItem.css'

export default function AllTeachersList() {
    const [teachersList, setTeachersList] = useState([]);
    useEffect(() => {
        doApi()
    }, []);

    const doApi = async () => {
        let url = API_URL + '/teachers/';
        try {
            const { data } = await doApiGet(url);
            console.log(data);
            let new_url;
            for (const element of data) {
                const encodedSearch = encodeURIComponent(element.user_id);
                new_url = API_URL + `/teachers/teacherInfo/${encodedSearch}`;
                console.log(new_url);
                let teacher = await doApiGet(new_url);
                console.log(teacher.data);
                setTeachersList(teachersList => [...teachersList, teacher.data])
            }
            console.log(teachersList);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='container'>
            {/* <button className='btn-teacher py-2 px-5 my-2'>סינון מורים</button> */}
            <h4>בחר את מורה הנהיגה שלך:</h4>
            <div className='g-2'>
                {teachersList.map(item => {
                    return (
                        <TeacherItem key={item._id} item={item} />
                    )
                })}
                {teachersList.length < 1 && <h2>Loading....</h2>}
            </div>
        </div>
    )
}