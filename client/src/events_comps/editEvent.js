import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { TOKEN_NAME } from '../services/apiService';
import { AppContext } from '../context/userProvider';
import { useForm } from 'react-hook-form';


const EditEventModal = ({ event, onUpdate, onDelete, onClose }) => {
  const [teacher_id, setTeacher_id] = useState(event.extendedProps.teacher_id || '');
  const [student_id, setStudent_id] = useState(event.extendedProps.student_id || '');
  const [title, setTitle] = useState(event.title || '');
  const [start, setStart] = useState(event.start || '');
  const [end, setEnd] = useState(event.end || '');
  const { user, myStudents } = useContext(AppContext);
  const { watch, register, handleSubmit, formState: { errors } } = useForm();

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
    onUpdate(updatedEvent, event.extendedProps._id);
  };
  const handleDelete = () => {
    onDelete(event.extendedProps._id)
  }
  const validateStartTime = (value) => {
    const selectedTime = new Date(value);
    const currentTime = new Date();

    if (selectedTime > currentTime) {
      return true;
    }

    return "Start time should be greater than the current time";
  };

  const validateEndTime = (value) => {
    const selectedTime = new Date(value);
    const currentTime = new Date();
    const startTime = new Date(watch('start'));

    if (selectedTime > currentTime && selectedTime > startTime) {
      return true;
    }

    return "End time should be greater than the start time and the current time";
  };
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleUpdate)}>
        <Modal.Body>

          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" defaultValue={title}
              {...register('title', { required: 'Title is required' })}
              onChange={handleTitleChange} />
            {errors.title && <div className="error">{errors.title.message}</div>}
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student:</Form.Label>
            <Form.Select defaultValue={student_id} {...register('student_id', { required: 'Student is required' })} onChange={handleStudentChange}>
              <option value="">Select a student</option>
              {myStudents.map(student => (
                <option defaultValue={student.user_id} key={student.user_id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </Form.Select>
            {errors.student_id && <div className="error">{errors.student_id.message}</div>}
          </Form.Group>
          <Form.Group controlId="start">
            <Form.Label>Start Time:</Form.Label>
            <Form.Control type="datetime-local"
              {...register('start', {
                required: 'Start time is required',
                validate: validateStartTime
              })}
              defaultValue={start} onChange={handleStartChange} />
            {errors.start && <div className="error">{errors.start.message}</div>}
          </Form.Group>
          <Form.Group controlId="end">
            <Form.Label>End Time:</Form.Label>
            <Form.Control type="datetime-local" {...register('end', {
              required: 'End time is required',
              validate: validateEndTime
            })} defaultValue={end} onChange={handleEndChange} />
            {errors.end && <div className="error">{errors.end.message}</div>}
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          <Button variant="primary"  type='submit'>Update</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEventModal;
