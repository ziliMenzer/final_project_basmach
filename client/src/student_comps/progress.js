import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/userProvider';
import "./progress.scss";
import { keyframes } from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { API_URL, doApiTokenGet } from '../services/apiService';
import PaymentReminder from './paymentReminder';
import _ from 'lodash';

const Progress = () => {
  let closestDate;
  const { user } = useContext(AppContext);
  const [event, setEvent] = useState("");
  const [myEvents, setMyEvents] = useState([]);
  const subjectsArray = user.subjects_array;
  const subjects_array_hebrew = ["תמרורים", "פניות", "מהירות", "תפעול הרכב", "דרך בין-עירונית", "זכויות קדימה"];
  let total = 0;

  useEffect(() => {
    doApi();
    handleCloseEvent();
  }, []);

  // useEffect(() => {
  //   handleCloseEvent();
  // }, [myEvents]);
  useEffect(() => {
    if (myEvents.length > 0) {
      let today = new Date();
      closestDate = new Date(myEvents[0].start);
      if (today <= closestDate) {
        setEvent(closestDate.toLocaleString());
      } else {
        setEvent("אין ארועים בקרוב");
      }
    }
  }, [myEvents]);
  const doApi = async () => {
    try {
      let url = API_URL + `/events/${user.user_id}`;
      const { data } = await doApiTokenGet(url);
      setMyEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseEvent = () => {
   if (myEvents.length < 1) {
    setEvent("אין ארועים בקרוב");
  } else {
    let closestEvent = _.minBy(myEvents, (event) => Math.abs(new Date(event.start) - new Date()));
    if (closestEvent) {
      setEvent(new Date(closestEvent.start).toLocaleString());
    } else {
      setEvent("אין ארועים בקרוב");
    }
  }
    // if (myEvents.length < 1) {
    //   setEvent("אין ארועים בקרוב");
    // } else {
    //   let sorted = _.sortBy(myEvents, (event) => new Date(event.start));
    //   setMyEvents(sorted);
    //   console.log("sorted array", myEvents);
    //   let today = new Date();
    //   // myEvents.sort(function(a, b) {
    //   //   return new Date(b.start) - new Date(a.start);
    //   // });
    //   closestDate = new Date(myEvents[0].start);
    //   if (today <= closestDate) {
    //     setEvent(closestDate.toLocaleString());
    //   } else {
    //     setEvent("אין ארועים בקרוב");
    //   }
    // }
  };
  Object.keys(subjectsArray).map(item => {
    total += parseInt(subjectsArray[item] * 10);
  });
  total = Math.round(total / 6);
  // const doApi = async () => {
  //   try {
  //     let url = API_URL + `/events/${user.user_id}`;
  //     const { data } = await doApiTokenGet(url);
  //     console.log(data)
  //     setMyEvents(data);
  //     handleCloseEvent();
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleCloseEvent=()=>{
  //   if (myEvents.length<1){
  //     setEvent("אין ארועים בקרוב")
  //   }
  //   else{
  //     let today =new Date();
  //     console.log(today.toLocaleString());
  //     myEvents.sort(function(a,b){
  //       return new Date(b.start) - new Date(a.start);
  //     });
  //     closestDate=new Date(myEvents[0].start);
  //     if(today<=closestDate){
  //       setEvent(closestDate.toLocaleString())
  //     }
  //     else{
  //       setEvent("אין ארועים בקרוב");
  //     }
  //     console.log(myEvents);
  //   }
  // }
  return (
    <div className='container'>
      <h2>total: {total}%</h2>

      <ProgressBar>
        <ProgressBar now={total} label={`${total}%`} style={{
          backgroundColor: '#EF476F',
          animation: `load 6s`,
        }} />
        {/* <ProgressBar now={(100 - total)} key={2} style={{ backgroundColor: "grey" }} /> */}
      </ProgressBar>
      <br />
      <div>
        הארוע הקרוב: {event == "אין ארועים בקרוב" ? event : new Date(Date.parse(event)).toLocaleString()}
      </div>
      {/* <ProgressBar variant='danger' now={total} label={`${total}%`} /> */}
      <div className='smaller-container'>
        {Object.keys(subjectsArray).map((subject, index) => (
          <div key={index} className='m-4'>

            <h3>{subjects_array_hebrew[index]}:</h3>
            <div className="progress2 progress-moved">
              <div className="progress-bar2" style={{
                width: `${subjectsArray[subject] * 10}%`,
                backgroundColor: '#EF476F',
                animation: `load 6s`,

              }} >
                <style>{`
            @keyframes load {
              0%   { width: 5%; backgroundColor: #F9BCCA;}
              100% { width: ${subjectsArray[subject] * 10}; backgroundColor: #EF476F; }
            }
        `}</style>
              </div>
            </div>
          </div>
        ))}

      </div>
      {myEvents.length > 0 && <PaymentReminder myEvents={myEvents} />}
    </div>
  );

};

export default Progress;
