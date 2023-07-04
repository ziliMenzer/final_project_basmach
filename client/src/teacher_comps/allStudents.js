import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/userProvider"
import { API_URL, doApiMethodTokenNotStringify, doApiTokenGet } from '../services/apiService';
import StudentItem from './studentItem';
import TabsNav from './tabsNav';

export default function AllStudents() {
  const [activeTab, setActiveTab] = useState('/allStudents');
  const { myStudents, setMyStudents } = useContext(AppContext);
  const [student, setStudent] = useState({});
  const [notActive, setNotActive] = useState([]);
  const [active, setActive] = useState([]);
  const [waitingStudent, setWaitingStudent] = useState([]);

  useEffect(() => {
    doApi();
    console.log(myStudents);
  }, [setMyStudents]);
  useEffect(() => {
    setWaitingStudent(myStudents.filter(item => item.status === "waiting"));
    setActive(myStudents.filter(item => item.status === "active"));
    setNotActive(myStudents.filter(item => item.status === "un-active"));
    console.log("'waiting", waitingStudent);
    console.log("'active", active);
    console.log("'un-active", notActive);
  }, [myStudents])
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
    <TabsNav setActiveTab={setActiveTab}></TabsNav>
    <div className='row g-2'>
      {activeTab === "/allStudents" && active.length < 1 && (
        <h2 className='text-center p-5'>אין לך תלמידים פעילים</h2>
      )}
      {activeTab === "/allStudents" &&
        active.map(item => {
          return (
            <StudentItem key={item._id} item={item} onStatusChange={onStatusChange} />
          );
        })}
  
      {activeTab === "/waiting" && waitingStudent.length < 1 && (
        <h2 className='text-center p-5'>אין לך תלמידים שממתינים לאישור</h2>
      )}
      {activeTab === "/waiting" &&
        waitingStudent.map(item => {
          return (
            <StudentItem key={item._id} item={item} onStatusChange={onStatusChange} />
          );
        })}
  
      {activeTab === "/un-active" && notActive.length < 1 && (
        <h2 className='text-center p-5'>אין לך תלמידים לא פעילים</h2>
      )}
      {activeTab === "/un-active" &&
        notActive.map(item => {
          return (
            <StudentItem key={item._id} item={item} onStatusChange={onStatusChange} />
          );
        })}
  
      {/* {activeTab === "/myStudents" && myStudents.length < 1 && (
        <h2>No Students Yet!</h2>
      )}
      {activeTab === "/myStudents" &&
        myStudents.map(item => {
          return (
            <StudentItem key={item._id} item={item} onStatusChange={onStatusChange} />
          );
        })} */}
    </div>
  </div>
  )  
}
