import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/userProvider"
import { API_URL, doApiTokenGet } from '../services/apiService';
import StudentItme from './studentItem';

export default function AllStudents() {
  const { myStudents, setMyStudents } = useContext(AppContext);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/students';
    try {
      const { data } = await doApiTokenGet(url);
      console.log(data);
      let new_url;
      for (const element of data) {
        const encodedSearch = encodeURIComponent(element.user_id);
        new_url = API_URL + `/students/myInfo/${encodedSearch}`;
        console.log(new_url);
        let student = await doApiTokenGet(new_url);
        console.log(student.data);
        setMyStudents(myStudents => [...myStudents, student.data]);
      }
      console.log(myStudents);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className='container'>
      <h2>Students List:</h2>
      <div className='row g-2'>
        {myStudents.map(item => {
          return (
            <StudentItme key={item._id} item={item} />
          )
        })}
        {myStudents.length < 1 && <h2>Loading....</h2>}
      </div>
    </div>
  )
}
