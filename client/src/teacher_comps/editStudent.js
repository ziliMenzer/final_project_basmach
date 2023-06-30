import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URL, TOKEN_NAME, doApiMethodToken, doApiMethodTokenNotStringify } from '../services/apiService';
import { AppContext } from '../context/userProvider';


export default function EditStudent(props) {
    const student = props.student;
    const showModal = props.showModal;
    const setShowModal = props.setShowModal;
    const doApi = props.doApi;
    const { user, myStudents, setMyStudents } = useContext(AppContext);

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
        console.log(updatedStudent);
        onUpdate(updatedStudent);
    };
    const onUpdate = async (updatedStudent) => {
        try {
            console.log(student.user_id);
            let url = API_URL + `/students/${student.user_id}`;
            const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedStudent);
            console.log(data);
            const updatedMyStudents = [...myStudents, updatedStudent];
            setMyStudents(updatedMyStudents);
        }
        catch (err) {
            console.log(err);
        }
        setShowModal(false);
    };
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>עדכן התקדמות של {student.first_name} {student.last_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ul>
                        <li>
                            <Form.Group controlId="traffic_signs">
                                <Form.Label>תמרורים:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={trafficSigns}
                                    onChange={(e) =>
                                        setTrrafficSigns(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="turns">
                                <Form.Label>פניות:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={turns}
                                    onChange={(e) =>
                                        setTurns(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="speed">
                                <Form.Label>מהירות:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={speed}
                                    onChange={(e) =>
                                        setSpeed(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="vehicle_operation">
                                <Form.Label>תפעול הרכב:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={vehicleOperation}
                                    onChange={(e) =>
                                        setVehicleOperation(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="internal_way">
                                <Form.Label> דרך בין-עירונית:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={internalWay}
                                    onChange={(e) =>
                                        setInternalWay(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                        <li>
                            <Form.Group controlId="rights">
                                <Form.Label>זכויות קדימה:</Form.Label>
                                <Form.Control type="number"
                                    defaultValue={rights}
                                    onChange={(e) =>
                                        setRights(parseInt(e.target.value))
                                    } />
                            </Form.Group>
                        </li>
                    </ul>
                    <Form.Group controlId="number_of_lessons">
                        <Form.Label>מספר שיעורים:</Form.Label>
                        <Form.Control type="number"
                            defaultValue={numberOfLessons}
                            onChange={(e) =>
                                setNumberOfLessons(parseInt(e.target.value))
                            } />
                    </Form.Group>
                    <Form.Group controlId="debt">
                        <Form.Label>חוב:</Form.Label>
                        <Form.Control type="number"
                            defaultValue={debt}
                            onChange={(e) =>
                                setDebt(parseInt(e.target.value))
                            } />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );

}  