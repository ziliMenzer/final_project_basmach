import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/userProvider"
import { API_URL, doApiMethodTokenNotStringify, doApiTokenGet } from '../services/apiService';
import StudentItem from './studentItem';

export default function AllStudents() {
  const { myStudents, setMyStudents } = useContext(AppContext);
  const [student, setStudent] = useState({});

  useEffect(() => {
    console.log("update use effect");
    doApi();
    console.log(myStudents);
  }, [setMyStudents]);

  const doApi = async () => {
    let url = API_URL + '/students';
    try {
      const { data } = await doApiTokenGet(url);
      console.log(data);

      let updatedStudents = [];

      for (const element of data) {
        let new_url = API_URL + `/students/myInfo/${element.user_id}`;
        console.log(new_url);

        let studentApi = await doApiTokenGet(new_url);
        console.log(studentApi.data);

        updatedStudents.push(studentApi.data);
      }

      setMyStudents(updatedStudents);

    } catch (err) {
      console.log(err);
    }
  };
  const onStatusChange = async (updatedStudent) => {
    try {
      let url = API_URL + `/students/${updatedStudent.user_id}`;
      const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedStudent);
      console.log(data);

      const updatedStudents = myStudents.map((item) => {
        if (item.user_id === updatedStudent.user_id) {
          return { ...item, ...updatedStudent };
        }
        return item;
      });
      setMyStudents(updatedStudents);
      console.log(myStudents)
      alert("התלמיד שונה בהצלחה!")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <h2>Students List:</h2>
      <div className='row g-2'>
        {myStudents.map(item => {
          return (
            <StudentItem key={item._id} item={item} onStatusChange={onStatusChange} />
          );
        })}
        {myStudents.length < 1 && <h2>Loading....</h2>}
      </div>
    </div>
  );
}
