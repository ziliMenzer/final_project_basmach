import React, { useState } from 'react';

const EventForm = ({ onCreate }) => {
  const [eventTitle, setEventTitle] = useState('');

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onCreate(eventTitle);
    setEventTitle('');
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={handleTitleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EventForm;