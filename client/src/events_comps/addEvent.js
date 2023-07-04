// import React, { useContext, useEffect, useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { AppContext } from '../context/userProvider';
// import { TOKEN_NAME } from '../services/apiService';

// const AddEventModal = ({ onAdd, onClose }) => {
//   const { watch, register, handleSubmit, formState: { errors } } = useForm();
//   const { user, myStudents } = useContext(AppContext);
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const [price, setPrice] = useState(0);
//   const [title, setTitle] = useState("");
//   const handleAdd = (data) => {
//     console.log(title);
//     console.log(selectedStudent);
//     const newEvent = {
//       teacher_id: user.user_id,
//       student_id: selectedStudent,
//       title: title,
//       start: new Date(data.start),
//       end: new Date(data.end),
//     };
//     console.log(newEvent);
//     onAdd(newEvent);
//     onClose();
//   };

//   const validateStartTime = (value) => {
//     const selectedTime = new Date(value);
//     const currentTime = new Date();

//     if (selectedTime >= currentTime) {
//       return true;
//     }

//     return "Start time should be greater than the current time";
//   };

//   const validateEndTime = (value) => {
//     const selectedTime = new Date(value);
//     const currentTime = new Date();
//     const startTime = new Date(watch('start'));

//     if (selectedTime > currentTime && selectedTime > startTime) {
//       return true;
//     }

//     return "End time should be greater than the start time and the current time";
//   };
//   return (
//     <Modal show={true} onHide={onClose}>
// <Modal.Header closeButton>
//   <Modal.Title>Add Event</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//         <Form onSubmit={handleSubmit(handleAdd)}>
//           <Form.Group controlId="title">
//             <Form.Label>Title:</Form.Label>
//             <Form.Select
//               onChange={(e) => {
//                 console.log("Selected title:", e.target.options[e.target.selectedIndex].text);
//                 setTitle(e.target.options[e.target.selectedIndex].text);
//                 setPrice(e.target.value);
//               }}
//               {...register('title', { required: 'Title is required' })}
//             >
//               <option value="">בחר אירוע</option>
//               <option value={user.payment_per_lesson}>שיעור נהיגה</option>
//               <option value={user.payment_per_lesson * 2}>שיעור נהיגה כפול</option>
//               <option value={250}>טסט פנימי</option>
//               <option value={373}>טסט חיצוני</option>
//             </Form.Select>
//             {errors.title && <div className="error">{errors.title.message}</div>}
//           </Form.Group>
//           <Form.Group controlId="student_id">
//             <Form.Label>Student:</Form.Label>
//             <Form.Select
//               onChange={(e) => {
//                 console.log("Selected student:", e.target.value);
//                 setSelectedStudent(e.target.value);
//               }}
//               {...register('student_id', { required: 'Student is required' })}
//             >
// <option value="">Select a student</option>
// {myStudents.map((student) => (
//   <option value={student.user_id} key={student.user_id}>
//     {student.first_name} {student.last_name}
//   </option>
// ))}
//             </Form.Select>
//             {errors.student_id && <div className="error">{errors.student_id.message}</div>}
//           </Form.Group>
// <Form.Group controlId="start">
//   <Form.Label>Start Time:</Form.Label>
//   <Form.Control type="datetime-local" {...register('start', {
//     required: 'Start time is required',
//     validate: validateStartTime
//   })} />
//   {errors.start && <div className="error">{errors.start.message}</div>}
// </Form.Group>
// <Form.Group controlId="end">
//   <Form.Label>End Time:</Form.Label>
//   <Form.Control type="datetime-local"{...register('end', {
//     required: 'End time is required',
//     validate: validateEndTime
//   })} />
//   {errors.end && <div className="error">{errors.end.message}</div>}
// </Form.Group>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={onClose}>Cancel</Button>
//     <Button variant="primary" type="submit">Add</Button>
//   </Modal.Footer>
// </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddEventModal;

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
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleAdd)}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Select
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                setValue('title', selectedOption.text);
                setValue('student_id', selectedOption.value);
              }}
              {...register('title', { required: 'Title is required' })}
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
              {...register('student_id', { required: 'Student is required' })}
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
              required: 'Start time is required',
              validate: validateStartTime
            })} />
            {errors.start && <div className="error">{errors.start.message}</div>}
          </Form.Group>
          <Form.Group controlId="end">
            <Form.Label>End Time:</Form.Label>
            <Form.Control type="datetime-local"{...register('end', {
              required: 'End time is required',
              validate: validateEndTime
            })} />
            {errors.end && <div className="error">{errors.end.message}</div>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEventModal;
