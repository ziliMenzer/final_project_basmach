import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/userProvider';
import { TOKEN_NAME } from '../services/apiService';

const AddEventModal = ({ onAdd, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { user, myStudents } = useContext(AppContext);

  const handleAdd = (data) => {
    const newEvent = {
      teacher_id: user.user_id,
      student_id: data.student_id,
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    console.log(newEvent);
    onAdd(newEvent);
    onClose();
  };

  const validateStartTime = (value) => {
    const selectedTime = new Date(value);
    const currentTime = new Date();

    if (selectedTime >= currentTime) {
      return true;
    }

    return "זמן התחלת אירוע צריך להיות גדול מהזמן הנוכחי";
  };

  const validateEndTime = (value) => {
    const selectedTime = new Date(value);
    const currentTime = new Date();
    const startTime = new Date(watch('start'));

    if (selectedTime > currentTime && selectedTime > startTime) {
      return true;
    }

    return "זמן סיום אירוע צריך להיות גדול מזמן התחלת אירוע ומהזמן הנוכחי";
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת אירוע</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleAdd)}>
          <Form.Group controlId="title">
            <Form.Label>שם אירוע</Form.Label>
            <Form.Select
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                setValue('title', selectedOption.text);
                setValue('student_id', selectedOption.value);
              }}
              {...register('title', { required: 'שם אירוע הוא חובה' })}
            >
              <option value="">בחר אירוע</option>
              <option value={"שיעור נהיגה"}>שיעור נהיגה</option>
              <option value={"שיעור נהיגה כפול"}>שיעור נהיגה כפול</option>
              <option value={"טסט פנימי"}>טסט פנימי</option>
              <option value={"טסט חיצוני"}>טסט חיצוני</option>
            </Form.Select>
            {errors.title && <div className="error">{errors.title.message}</div>}
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student:</Form.Label>
            <Form.Select
              onChange={(e) => {
                setValue('student_id', e.target.value);
              }}
              {...register('student_id', { required: 'בחירת תלמיד היא חובה' })}
            >
              <option value="">Select a student</option>
              {myStudents.map((student) => (
                <option value={student.user_id} key={student.user_id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}          </Form.Select>
            {errors.student_id && <div className="error">{errors.student_id.message}</div>}
          </Form.Group>
          <Form.Group controlId="start">
            <Form.Label>Start Time:</Form.Label>
            <Form.Control type="datetime-local" {...register('start', {
              required: 'זמן התחלת אירוע הוא חובה',
              validate: validateStartTime
            })} />
            {errors.start && <div className="error">{errors.start.message}</div>}
          </Form.Group>
          <Form.Group controlId="end">
            <Form.Label>End Time:</Form.Label>
            <Form.Control type="datetime-local"{...register('end', {
              required: 'זמן סיום אירוע הוא חובה',
              validate: validateEndTime
            })} />
            {errors.end && <div className="error">{errors.end.message}</div>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>ביטול</Button>
            <Button variant="primary" type="submit">הוספת אירוע</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEventModal;
