import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EventModal = ({ event, onUpdate, onClose }) => {
  const [student_id, setStudent_id] = useState(event.student_id);
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);
  // const [participants, setParticipants] = useState(event.extendedProps.participants.join(', '));

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleStudentChange = (e) => {
    setStudent_id(e.target.value);
  };
  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };

  // const handleParticipantsChange = (e) => {
  //   setParticipants(e.target.value);
  // };

  const handleUpdate = () => {
    const updatedEvent = {
      ...event,
      student_id:student_id,
      title: title,
      start: start,
      end: end,
      // extendedProps: {
      //   ...event.extendedProps,
      //   participants: participants.split(',').map((participant) => participant.trim()),
      // },
    };

    onUpdate(updatedEvent);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student Id:</Form.Label>
            <Form.Control type="text" value={student_id} onChange={handleStudentChange} />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.Label>Start Time:</Form.Label>
            <Form.Control type="datetime-local" value={start} onChange={handleStartChange} />
          </Form.Group>
          <Form.Group controlId="end">
            <Form.Label>End Time:</Form.Label>
            <Form.Control type="datetime-local" value={end} onChange={handleEndChange} />
          </Form.Group>
          {/* <Form.Group controlId="participants">
            <Form.Label>Participants:</Form.Label>
            <Form.Control type="text" value={participants} onChange={handleParticipantsChange} />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
