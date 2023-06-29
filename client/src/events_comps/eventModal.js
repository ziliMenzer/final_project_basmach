import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import { user } from "../context/userProvider";

const UpdateEvevt = ({event,events,setEvents}) => {
  // const {setGarden, garden } = GardenState();
  const [newEvent, setNewEvent] = useState();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (event) {
      setNewEvent(event);
    }
  }, [event]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      event.preventDefault();
      console.log(newEvent);
      Update();
    }
    setValidated(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Update = async () => {
    let url="";
    const { data } = await axios.put(
      url,
      newEvent
    );
    setEvents(data);
    handleClose();
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Button variant="warning" onClick={handleShow} className="mb-2">
        <strong>עדכן ארוע</strong>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> עדכון ארוע</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                מקורה?
              </Form.Label>
              <Col>
                <Form.Select
                  value={newGarden?.sun}
                  onChange={(e) => {
                    setNewGarden({ ...newGarden, sun: e.target.value });
                  }}
                  aria-label="Floating label select example"
                >
                  <option disabled>בחר מבן האפשרויות</option>
                  <option>כן</option>
                  <option>לא</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
              <Form.Label column sm="3">
                מיקום
              </Form.Label>
              <Col>
                <Form.Select
                  value={newGarden?.position}
                  onChange={(e) => {
                    setNewGarden({ ...newGarden, position: e.target.value });
                  }}
                  aria-label="Floating label select example"
                >
                  <option disabled>בחר מבן האפשרויות</option>
                  <option key="צפון">אדמה</option>
                  <option key="השפלה">לא באדמה</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <div style={{ textAlign: "left" }}>
              <Button variant="primary" type="submit">
                עדכן גינה
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateEvevt;