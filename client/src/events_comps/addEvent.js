// import React, { useState, useContext, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { AppContext } from '../context/userProvider';
// import { TOKEN_NAME } from '../services/apiService';
// import { useForm } from 'react-hook-form';

// const AddEventModal = ({ onAdd, onClose }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [teacher_id, setTeacher_id] = useState('');
//   const [title, setTitle] = useState('');
//   const [student_id, setStudent_id] = useState('');
//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');

//   const { user, myStudents } = useContext(AppContext);

//   useEffect(() => {
//     handleTeacherId();
//   }, []);

//   const handleTeacherId = () => {
//     //console.log(user._id);
//     setTeacher_id(user.user_id);
//   }

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };
//   const handleStudentChange = (e) => {
//     console.log(e.target.value);
//     setStudent_id(e.target.value);
//   };
//   const handleStartChange = (e) => {
//     setStart(e.target.value);
//   };

//   const handleEndChange = (e) => {
//     setEnd(e.target.value);
//   };

//   const handleAdd = () => {
//     console.log(student_id)
//     const newEvent = {
//       teacher_id: teacher_id,
//       student_id: student_id,
//       title: title,
//       start: new Date(start),
//       end: new Date(end),
//     };

//     onAdd(newEvent);
//     onClose();
//   };
//   const getNameById = (student_id) => {

//   }
//   // const getIdByName = (student_id) => {

//   // }

//   return (
//     <Modal show={true} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Event</Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={handleSubmit(handleAdd)}>
//         <Modal.Body>

//           <Form.Group controlId="title">
//             <Form.Label>Title:</Form.Label>
//             <Form.Control type="text" defaultValue={title}
//               {...register('title', { required: true })}
//               onChange={handleTitleChange}
//             />
//             {errors.title && <span className="text-danger">שדה זה הוא חובה</span>}
//           </Form.Group>
//           <Form.Group controlId="student_id">
//             <Form.Label>Student:</Form.Label>
//             <Form.Select defaultValue={student_id} onChange={handleStudentChange}>
//               <option value="">Select a student</option>
//               {myStudents.map(student => (
//                 <option defaultValue={student.user_id} key={student.user_id}>
//                   {student.first_name} {student.last_name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//           {/* <Form.Group controlId="student_id">
//             <Form.Label>Student Id:</Form.Label>
//             <Form.Control type="text" defaultValue={student_id} onChange={handleStudentChange} />
//           </Form.Group> */}
//           <Form.Group controlId="start">
//             <Form.Label>Start Time:</Form.Label>
//             <Form.Control type="datetime-local" defaultValue={start} onChange={handleStartChange} />
//           </Form.Group>
//           <Form.Group controlId="end">
//             <Form.Label>End Time:</Form.Label>
//             <Form.Control type="datetime-local" defaultValue={end} onChange={handleEndChange} />
//           </Form.Group>

//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>Cancel</Button>
//           <Button variant="primary" type="submit">Add</Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default AddEventModal;
import React, { useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/userProvider';
import { TOKEN_NAME } from '../services/apiService';

const AddEventModal = ({ onAdd, onClose }) => {
  const { watch,register, handleSubmit, formState: { errors } } = useForm();
  const { user, myStudents } = useContext(AppContext);

  useEffect(() => {
    handleTeacherId();
  }, []);

  const handleTeacherId = () => {
    //console.log(user._id);
    // setTeacher_id(user.user_id);
  }

  const handleAdd = (data) => {
    const newEvent = {
      teacher_id: user.user_id,
      student_id: data.student_id,
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
    };

    onAdd(newEvent);
    onClose();
  };

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
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleAdd)}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" {...register('title', { required: 'Title is required' })} />
            {errors.title && <div className="error">{errors.title.message}</div>}
          </Form.Group>
          <Form.Group controlId="student_id">
            <Form.Label>Student:</Form.Label>
            <Form.Select {...register('student_id', { required: 'Student is required' })}>
              <option value="">Select a student</option>
              {myStudents.map(student => (
                <option value={student.user_id} key={student.user_id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </Form.Select>
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
