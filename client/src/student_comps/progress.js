import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/userProvider';
import "./progress.scss";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { API_URL, doApiTokenGet } from '../services/apiService';
import PaymentReminder from './paymentReminder';
import Card from 'react-bootstrap/Card';
import _ from 'lodash';
import turns from "../assets/turns.png"
import Stop from "../assets/stop.png";
import rights from "../assets/rights.png";
import road from "../assets/road.png";
import speedometer from "../assets/speedometer.png";
import SteeringWeel from "../assets/steering-wheel.png";
const Progress = () => {
  let closestDate;
  const { user } = useContext(AppContext);
  const [event, setEvent] = useState("");
  const [myEvents, setMyEvents] = useState([]);
  const subjectsArray = user.subjects_array;
  const subjects_array_symbols = [Stop, turns, speedometer, SteeringWeel, road, rights];
  const subjects_array_hebrew = ["תמרורים", "פניות", "מהירות", "תפעול הרכב", "דרך בין-עירונית", "זכויות קדימה"];
  let total = 0;

  useEffect(() => {
    doApi();
    handleCloseEvent();
  }, []);

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

  };
  Object.keys(subjectsArray).map(item => {
    total += parseInt(subjectsArray[item] * 10);
  });
  total = Math.round(total / 6);
  const progressBarWidth = `${total}%`;

  return (
    <div className='container'>
      <div className="p-2" style={{ textAlign: "center", fontSize: "3em" }}>
        <h2 className="m-2 display-6">עשית כבר- {total}% מהדרך!</h2>
        <ProgressBar>
          <ProgressBar
            now={total}
            label={`${total}%`}
            style={{
              backgroundColor: "#EF476F",
              animation: "none",
            }}
          />
        </ProgressBar>
      </div>
      <br />
      <div style={{ textAlign: "center", background: "#f2f2f2" }}>
        <i className="fa fa-calendar" aria-hidden="true" style={{ fontSize: "3rem" }}></i>
        <br />
        <p>
          הארוע הקרוב: {event === "אין ארועים בקרוב" ? event : new Date(Date.parse(event)).toLocaleString("en-GB")}
        </p>

      </div>
      <style>
        {`
          @keyframes load {
            0%   { width: 0%; background-color: #F9BCCA; }
            100% { width: ${progressBarWidth}; background-color: #EF476F; }
          }

          .custom-animation {
            animation-name: load;
            animation-duration: 2s;
            animation-delay: 0s;
          }
        `}
      </style>
      <div className='smaller-container flex-wrap d-flex'>
        {Object.keys(subjectsArray).map((subject, index) => (
          <div key={index} className='each-progrees col-md-4 p-2'>
            <Card>
              <Card.Img className='p-3' variant="top" src={subjects_array_symbols[index]} height={"200px"} width={"80px"} />
              <Card.Body>
                <Card.Title>{subjects_array_hebrew[index]}</Card.Title>
                <div className="progress2 progress-moved">
                  <div
                    className="progress-bar2 custom-animation" // Apply the custom-animation class
                    style={{
                      width: `${subjectsArray[subject] * 10}%`,
                      backgroundColor: '#EF476F',
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {myEvents.length > 0 && <PaymentReminder myEvents={myEvents} />}
    </div>
  );
};

export default Progress;
