import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Paper, Button } from '@mui/material';
import EditEventModal from './editEvent';
import AddEventModal from './addEvent';
import { doApiTokenGet, doApiMethodTokenNotStringify, API_URL, TOKEN_NAME } from '../services/apiService';
import { AppContext } from '../context/userProvider';
import "./calendar.css"

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user.role === "teacher") {
      setIsTeacher(true);
    }
    doApi();
  }, []);

  useEffect(() => {
    doApi();
  }, [selectedEvent]);

  const doApi = async () => {
    try {
      let url = API_URL + `/events/${user.user_id}`;
      const { data } = await doApiTokenGet(url);
      setEvents(data);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedEvent(event);
    setShowEditEventModal(true);
  };

  const handleEventUpdate = async (updatedEvent, id) => {
    try {
      let url = API_URL + `/events/${id}`;
      await doApiMethodTokenNotStringify(url, "PUT", updatedEvent);
      const updatedEvents = [...events];
      const eventIndex = updatedEvents.findIndex((event) => event.id === id);
      if (eventIndex !== -1) {
        updatedEvents[eventIndex] = updatedEvent;
        setEvents(updatedEvents);
      }
    }
    catch (err) {
      console.log(err);
    }
    setSelectedEvent(null);
    setShowEditEventModal(false);
  };

  const handleEventDelete = async (_id) => {
    try {
      let url = API_URL + `/events/${_id}`;
      await doApiMethodTokenNotStringify(url, "DELETE");
      setEvents(events.filter((event) => event.id !== _id));
    }
    catch (err) {
      console.log(err);
    }
    setSelectedEvent(null);
    setShowEditEventModal(false);
  };

  const handleAddEvent = async (_newEvent) => {
    try {
      let url = API_URL + '/events/';
      const { data } = await doApiMethodTokenNotStringify(url, "POST", _newEvent);
      setEvents([...events, data]);
    }
    catch (err) {
      console.log(err);
    }
    setShowAddEventModal(false);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowEditEventModal(false);
    setShowAddEventModal(false);
  };
  // <div className=' container col-7 c1 p-3 my-5'>
    // <div  className='container c2 bg-light my-5 p-2 w-75 h-50'>
  return (
    // <div style={{ backgroundColor: "#f4f5f7" }}>
    //   <div className='container-fluid c3 h-50 ' >
    //     <h2 className='display-6 py-5 me-5'>השיעורים שלי</h2>
    //   </div>
    //   <div className='container c2 w-75 py-5 bg-light' >
   <div className=' container col-7 c1 p-3 my-5'>
    <div  className='container c2 bg-light my-5 p-2 w-75 h-50'>
      {/* <Paper elevation={3} className='calendar-paper'> */}
        <FullCalendar 
          id='calendar'
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={events}
          eventClick={handleEventClick}
          slotDuration="00:30:00"
          slotMinTime="06:00:00"
        />

        {selectedEvent && isTeacher && (
          <EditEventModal
            event={selectedEvent}
            onUpdate={handleEventUpdate}
            onDelete={handleEventDelete}
            onClose={handleCloseModal}
          />
        )}
      {/* </Paper> */}

      {showAddEventModal && (
        <AddEventModal onAdd={handleAddEvent} onClose={handleCloseModal} />
      )}

      {isTeacher && (
        <div className=' m-2 p-2 d-flex justify-content-center text-center align-items-center'>
          <button variant="contained" className='btn-add rounded-pill py-2 px-3' onClick={() => setShowAddEventModal(true)}>הוסף אירוע</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Calendar;
