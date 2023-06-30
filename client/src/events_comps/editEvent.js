import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TOKEN_NAME } from '../services/apiService';
import { AppContext } from '../context/userProvider';


const EditEventModal = ({ event, onUpdate, onDelete, onClose }) => {
  const [teacher_id, setTeacher_id] = useState(event.extendedProps.teacher_id || '');
  const [student_id, setStudent_id] = useState(event.extendedProps.student_id || '');
  const [title, setTitle] = useState(event.title || '');
  const [start, setStart] = useState(event.start || '');
  const [end, setEnd] = useState(event.end || '');
  const { user, myStudents } = useContext(AppContext);
  // const [participants, setParticipants] = useState(event.extendedProps.participants.join(', '));
  useEffect(() => {
    console.log(event)
    setTeacher_id(event.extendedProps.teacher_id || '');
    setStudent_id(event.extendedProps.student_id || '');
    setTitle(event.title || '');
    setStart(event.start || '');
    setEnd(event.end || '');
  }, [event]);

  // useEffect(() => {
  //   handleTeacherId();
  // }, []);

  // const handleTeacherId = () => {
  //   //setTeacher_id(user._id);
  //   setTeacher_id(user._id);
  // }
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
      teacher_id: teacher_id,
      student_id: student_id,
      title: title,
      start: start,
      end: end,
    };
    console.log(event.extendedProps._id);
    onUpdate(updatedEvent,event.extendedProps._id);
  };
  const handleDelete = () => {
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
            <Form.Label>Student:</Form.Label>
            <Form.Select defaultValue={student_id} onChange={handleStudentChange}>
              <option value="">Select a student</option>
              {myStudents.map(student => (
                <option defaultValue={student.user_id} key={student.user_id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="student_id">
            <Form.Label>Student Id:</Form.Label>
            <Form.Control type="text" defaultValue={student_id} onChange={handleStudentChange} />
          </Form.Group> */}
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
