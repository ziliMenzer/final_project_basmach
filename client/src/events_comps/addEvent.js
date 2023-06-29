import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/userProvider';

const AddEventModal = ({ onAdd, onClose }) => {
  const [teacher_id, setTeacher_id] = useState('');
  const [title, setTitle] = useState('');
  const [student_id, setStudent_id] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const { user, myStudents } = useContext(AppContext);

  useEffect(() => {
    handleTeacherId();
  }, []);

  const handleTeacherId = () => {
    //setTeacher_id(user._id);
    setTeacher_id(user._id);
  }

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

  const handleAdd = () => {
    console.log(student_id)
    const newEvent = {
      teacher_id: teacher_id,
      student_id: student_id,
      title: title,
      start: new Date(start),
      end: new Date(end),
    };

    onAdd(newEvent);
    onClose();
  };
  const getNameById = (student_id) => {
      
  }
  // const fillSelectBox = () => {
  //   myStudents.map((item) => {
  //     return item.first_name+" "+item.last_name;
  //   });
  //};
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" defaultValue={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student:</Form.Label>
            <Form.Select defaultValue={getNameById(student_id)}>
              {myStudents.map(student => (
                <option onChange={handleStudentChange} key={student._id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}

              {/* <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
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
        <Button variant="primary" onClick={handleAdd}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEventModal;
