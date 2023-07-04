import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Paper, Button } from '@mui/material';
import EditEventModal from './editEvent';
import AddEventModal from './addEvent';
import { doApiTokenGet, doApiMethodTokenNotStringify, API_URL, TOKEN_NAME, doApiMethodToken } from '../services/apiService';
import UserProvider, { AppContext, UserState } from '../context/userProvider';

export default function Calendar ()  {
  const [events, setEvents] = useState([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [currentView, setCurrentView] = useState('timeGridWeek');
  const { user } = useContext(AppContext);
  const [calendarKey, setCalendarKey] = useState(Date.now()); // Add key state

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
      await doApiMethodToken(url, "DELETE");
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

  const handleSwitchToMonthView = () => {
    setCurrentView('dayGridMonth');
    setCalendarKey(Date.now()); // Update the key value to trigger re-render
  };

  return (
    <div className='container'>
      {/* <Paper elevation={3} className='calendar-paper demo-app'> */}
      <div className='m-2 p-2 d-flex justify-content-center text-center align-items-center'>
        {isTeacher && (
          <Button variant="contained" color="primary" onClick={() => setShowAddEventModal(true)}>Add Event</Button>)}
          <Button variant="contained" color="primary" onClick={handleSwitchToMonthView}>Month View</Button>
        </div>
        <FullCalendar
          key={calendarKey} // Add key prop to force re-render
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          views={{
            dayGridMonth: {
              type: 'dayGrid',
              duration: { months: 1 },
            },
          }}
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
      
    </div>
    // </div>
  );
};

;
