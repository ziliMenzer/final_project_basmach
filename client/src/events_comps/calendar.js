import React, { useState, useEffect, useContext } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
import EditEventModal from './editEvent';
import AddEventModal from './addEvent';
import { doApiTokenGet, doApiMethodToken, doApiMethodTokenNotStringify, API_URL, TOKEN_NAME } from '../services/apiService';
import { AppContext } from '../context/userProvider';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log(events);
    doApi();
  }, []);

  useEffect(() => {
    doApi();
  }, [selectedEvent])

  const doApi = async () => {
    try {
      let url = API_URL + `/events/${user.user_id}`;
      const { data } = await doApiTokenGet(url);
      console.log(data);
      setEvents(data);
    }
    catch (err) {
      console.log(err)
    }
  }
  // const formatEventsForCalendar = (event) => {
  //   let formated_event = {
  //     title: event.title,
  //     student_id: String(event.student_id),
  //     start: new Date(event.start),
  //     end: new Date(event.end),
  //   };
  //   return formated_event;
  // };
  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedEvent(event);
    setShowEditEventModal(true);
  };

  const handleEventUpdate = async (updatedEvent, id) => {
    try {
      console.log(id);
      let url = API_URL + `/events/${id}`;
      const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedEvent);
      console.log(data);
      const updatedEvents = [...events, updatedEvent];
      setEvents(updatedEvents);
    }
    catch (err) {
      console.log(err);
    }
    setSelectedEvent(null);
    setShowEditEventModal(false);
  };

  const handleEventDelete = async (_id) => {
    try {
      console.log(_id);
      let url = API_URL + `/events/${_id}`;
      const { data } = await doApiMethodTokenNotStringify(url, "DELETE");
      console.log(data);
      // const updatedEvents = [...events];
      // setEvents(updatedEvents);
    }
    catch (err) {
      console.log(err)
    }
    //const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
    doApi();
    console.log(events);
    setSelectedEvent(null);
    setShowEditEventModal(false);
  };

  const handleAddEvent = async (_newEvent) => {
    try {
      console.log(_newEvent);
      let url = API_URL + '/events/';
      const { data } = await doApiMethodTokenNotStringify(url, "POST", _newEvent);
      console.log(data);
      const updatedEvents = [...events, _newEvent];
      setEvents(updatedEvents);
    }
    catch (err) {
      console.log(err)
    }
    setShowAddEventModal(false);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowEditEventModal(false);
    setShowAddEventModal(false);
  };

  return (
    <div className='container'>

      <div className=''>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={(events)}
          //events={events}
          eventClick={handleEventClick}
          slotDuration="00:30:00" // Set the duration of each time slot to 30 minutes
          slotMinTime="06:00:00" // Set the minimum time to display on the calendar
        />
      </div>

      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onUpdate={handleEventUpdate}
          onDelete={handleEventDelete}
          onClose={handleCloseModal}
        />
      )}
      {showAddEventModal && (
        <AddEventModal onAdd={handleAddEvent} onClose={handleCloseModal} />
      )}
      <div className='m-2 p-2 d-flex justify-content-center text-center align-items-center'>
        <button className='btn btn-dark ' onClick={() => setShowAddEventModal(true)}>Add Event</button>
      </div>
    </div>
  );
};

export default Calendar;

