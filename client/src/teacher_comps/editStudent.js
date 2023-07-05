import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { API_URL, TOKEN_NAME, doApiMethodToken, doApiMethodTokenNotStringify } from '../services/apiService';
import { AppContext } from '../context/userProvider';


export default function EditStudent(props) {
    const student = props.student;
    const showModal = props.showModal;
    const setShowModal = props.setShowModal;
    // const doApi = props.doApi;
    const { user, myStudents, setMyStudents } = useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [trafficSigns, setTrrafficSigns] = useState(student.subjects_array.traffic_signs || 0);
    const [turns, setTurns] = useState(student.subjects_array.turns || 0);
    const [speed, setSpeed] = useState(student.subjects_array.speed || 0);
    const [vehicleOperation, setVehicleOperation] = useState(student.subjects_array.vehicle_operation || 0);
    const [internalWay, setInternalWay] = useState(student.subjects_array.internal_way || 0);
    const [rights, setRights] = useState(student.subjects_array.rights || 0);
    const [numberOfLessons, setNumberOfLessons] = useState(student.number_of_lessons || 0);
    const [debt, setDebt] = useState(student.debt || 0);


    const handleUpdate = () => {

        const updatedStudent = {
            user_id: student.user_id,
            subjects_array: {
                traffic_signs: trafficSigns,
                turns: turns,
                speed: speed,
                vehicle_operation: vehicleOperation,
                internal_way: internalWay,
                rights: rights
            },
            teacher_id: student.teacher_id,
            number_of_lessons: numberOfLessons,
            debt: debt
        };
        // console.log(updatedStudent);
        onUpdate(updatedStudent);
    };
    const onUpdate = async (updatedStudent) => {
        try {
            let url = API_URL + `/students/${student.user_id}`;
            const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedStudent);
            console.log(data);

            const updatedStudents = myStudents.map((item) => {
                if (item.user_id === updatedStudent.user_id) {
                    return { ...item, ...updatedStudent };
                }
                return item;
            });

            setMyStudents(updatedStudents);
        } catch (err) {
            console.log(err);
        }

        setShowModal(false);
    };

    return (


        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>עדכן התקדמות של {student.first_name} {student.last_name}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(handleUpdate)}>
                <Modal.Body>
                    <ul>
                        <li>

                            <Form.Group controlId="traffic_signs">
                                <Form.Label>תמרורים:</Form.Label>
                                <Form.Control
                                    type="number"
                                    defaultValue={trafficSigns}
                                    {...register('traffic_signs', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setTrrafficSigns(parseInt(e.target.value))
                                    } />
                                {errors.traffic_signs && <span className="text-danger">הערך של תמרורים חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="turns">
                                <Form.Label>פניות:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={turns}
                                    {...register('turns', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setTurns(parseInt(e.target.value))
                                    } />
                                {errors.turns && <span className="text-danger">הערך של פניות חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="speed">
                                <Form.Label>מהירות:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={speed}
                                    {...register('speed', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setSpeed(parseInt(e.target.value))
                                    } />
                                {errors.speed && <span className="text-danger">הערך של מהירות חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="vehicle_operation">
                                <Form.Label>תפעול הרכב:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={vehicleOperation}
                                    {...register('vehicle_operation', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setVehicleOperation(parseInt(e.target.value))
                                    } />
                                {errors.vehicle_operation && <span className="text-danger">הערך של תפעול הרכב חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="internal_way">
                                <Form.Label> דרך בין-עירונית:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={internalWay}
                                    {...register('internal_way', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setInternalWay(parseInt(e.target.value))
                                    } />
                                {errors.internal_way && <span className="text-danger">הערך של דרך בין-עירונית חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="rights">
                                <Form.Label>זכויות קדימה:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={rights}
                                    {...register('rights', { min: 0, max: 10 })}
                                    onChange={(e) =>
                                        setRights(parseInt(e.target.value))
                                    } />
                                {errors.rights && <span className="text-danger">הערך של זכויות קדימה חייב להיות בין 0 ל-10 </span>}

                            </Form.Group>
                        </li>
                    </ul>
                    <Form.Group controlId="number_of_lessons">
                        <Form.Label>מספר שיעורים:</Form.Label>
                        <Form.Control type="number"
                            defaultValue={numberOfLessons}
                            {...register('number_of_lessons', { min: 0, max: 250 })}
                            onChange={(e) =>
                                setNumberOfLessons(parseInt(e.target.value))
                            } />
                        {errors.number_of_lessons && <span className="text-danger">מספר שיעורים חייב להיות בין 0 ל-250</span>}

                    </Form.Group>
                    <Form.Group controlId="debt">
                        <Form.Label>חוב:</Form.Label>
                        <Form.Control type="number"
                            defaultValue={debt}
                            {...register('debt', { min: 0, max: 1000 })}
                            onChange={(e) =>
                                setDebt(parseInt(e.target.value))
                            } />
                        {errors.debt && <span className="text-danger">חוב חייב להיות בין 0 ל-1000</span>}

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        סגירה
                    </Button>
                    <Button variant="primary" type="submit">
                        עדכון
                    </Button>
                </Modal.Footer>
            </Form >
        </Modal >

    );

}  