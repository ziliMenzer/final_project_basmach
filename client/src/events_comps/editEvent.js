import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TOKEN_NAME } from '../services/apiService';

const EditEventModal = ({ event, onUpdate, onDelete, onClose }) => {
  const [student_id, setStudent_id] = useState(event.extendedProps.student_id||'');
  const [title, setTitle] = useState(event.title||'');
  const [start, setStart] = useState(event.start||'');
  const [end, setEnd] = useState(event.end||'');
  // const [participants, setParticipants] = useState(event.extendedProps.participants.join(', '));
  useEffect(() => {
    console.log(event)
    setStudent_id(event.extendedProps.student_id || '');
    setTitle(event.title || '');
    setStart(event.start || '');
    setEnd(event.end || '');
  }, [event]);

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

  const handleUpdate = () => {
    const updatedEvent = {

      //teacher_id:TOKEN_NAME._id
      teacher_id:"6498a3d506290ae847849cb4",
      student_id: student_id,
      title: title,
      start: start,
      end: end,
    };

    onUpdate(updatedEvent,event.extendedProps._id);
  };
  const handleDelete =()=>{
    onDelete(event.extendedProps._id)
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" defaultValue={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student Id:</Form.Label>
            <Form.Control type="text" defaultValue={student_id} onChange={handleStudentChange} />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.Label>Start Time:</Form.Label>
            <Form.Control type="datetime-local" defaultValue={start} onChange={handleStartChange} />
          </Form.Group>
          <Form.Group controlId="end">
            <Form.Label>End Time:</Form.Label>
            <Form.Control type="datetime-local" defaultValue={end} onChange={handleEndChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
