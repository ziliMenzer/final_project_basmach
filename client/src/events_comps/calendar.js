import EventModal from './eventModal';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { doApiTokenGet, API_URL, TOKEN_NAME } from '../services/apiService';
import EditEvent from './editEvent';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    doApi();
  }, []);
  const doApi = async () => {
    try {
      let url = API_URL + '/events/';
      const { data } = await doApiTokenGet(url);
      console.log(data);
      setEvents(data);
    }
    catch (err) {
      console.log(err)
    }
  }
  const formatEventsForCalendar = (events) => {
    return events.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      student_id: event.student_id
    }));
  };

  const handleEventCreate = (newEvent) => {
    // Add the new event to the events array
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEventClick = (eventClickInfo) => {
    // Retrieve the event object from the clicked event
    const { event } = eventClickInfo;
    <EditEvent event={event} />
    // Set the selected event for editing
    setSelectedEvent(event);
  };

  const handleEventUpdate = (updatedEvent) => {
    // Find the index of the event being updated
    const index = events.findIndex((event) => event.id === updatedEvent.id);

    if (index !== -1) {
      // Create a copy of the events array
      const updatedEvents = [...events];
      console.log(events)
      // Update the event at the found index
      updatedEvents[index] = updatedEvent;

      // Update the events state with the modified array
      setEvents(updatedEvents);
    }

    // Clear the selected event
    setSelectedEvent(null);
  };

  const addEventClick = () => {
    nav('/addEvent');
  }
  return (
    <div>
      <h1>Calendar</h1>
      {TOKEN_NAME && (<button onClick={addEventClick}>הוספת ארוע</button>)}
      {/* <EventList events={events} />
      <EventForm onCreate={handleEventCreate} /> */}
      <div className='align-items-center text-center justify-content-center d-flex'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={formatEventsForCalendar(events)}
          eventClick={handleEventClick} // Add eventClick callback
          slotDuration="00:30:00" // Set the duration of each time slot to 30 minutes
          slotMinTime="06:00:00" // Set the minimum time to display on the calendar
          eventContent={({ event }) => (
            <div>
              <b>{event.title}</b>
              <p>{event.start.toLocaleString()}</p>
              <p>{event.end.toLocaleString()}</p>
              <p>{event.student_id}</p>
            </div>
          )}
        />
      </div>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onUpdate={handleEventUpdate}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
