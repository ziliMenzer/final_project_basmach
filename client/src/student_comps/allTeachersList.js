import React, { useState, useEffect } from 'react';
import TeacherItem from './teacherItem';
import { doApiGet, API_URL, TOKEN_NAME } from '../services/apiService';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
export default function AllTeachersList() {
  const [teachersList, setTeachersList] = useState([]);
  const [paymentRange, setPaymentRange] = useState({ min: 0, max: 100 });
  const [sex, setSex] = useState('');
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [citiesArray, setCitiesArray] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    doApi();
    fetchCities();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/teachers/';
    try {
      const { data } = await doApiGet(url);
      console.log(data);
      for (const element of data) {
        // const encodedSearch = encodeURIComponent(element._id);
        let new_url = API_URL + `/teachers/teacherInfo/${element.user_id}`;
        console.log(new_url);
        let teacher = await doApiGet(new_url);
        console.log(teacher.data);
        setTeachersList(teachersList => [...teachersList, teacher.data]);
        console.log(teachersList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCities = async () => {
    let url = "https://data.gov.il/api/3/action/datastore_search?resource_id=ec172c08-27fe-4d97-960d-dabf741c077f&limit=1500";
    try {
      let resp = await axios.get(url);
      setCitiesArray(resp.data.result.records);
    } catch (err) {
      console.log("Error");
      alert("There is a problem");
    }
  };

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const filterTeachers = () => {
    return teachersList.filter((teacher) => {
      const payment = teacher.payment_per_lesson;
      if (payment < paymentRange.min || payment > paymentRange.max) {
        return false;
      }

      if (sex && teacher.sex !== sex) {
        return false;
      }
      if (
        selectedAddresses.length > 0 &&
        !selectedAddresses.includes(teacher.address)
      ) {
        return false;
      }
      return true;
    });
  };

  return (
    <div className='container'>
      <h2>רשימת המורים:</h2>
{/* 
      <Button
        variant='primary'
        onClick={() => setShowFilters(true)}
        className='mb-3'
      >
        סינון מורה
      </Button>

      <Modal
        show={showFilters}
        onHide={() => setShowFilters(false)}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>סינון מורה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId='paymentRange'>
                  <Form.Label>טווח מחירים -{paymentRange.min}- {paymentRange.max}</Form.Label>
                  <input
                    type='range'
                    min={0}
                    max={100}
                    value={paymentRange.max}
                    onChange={(e) =>
                      setPaymentRange({ ...paymentRange, max: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId='sexFilter'>
                  <Form.Label>מין</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type='radio'
                      label='Male'
                      name='sex'
                      value='male'
                      checked={sex === 'male'}
                      onChange={() => setSex('male')}
                    />
                    <Form.Check
                      inline
                      type='radio'
                      label='Female'
                      name='sex'
                      value='female'
                      checked={sex === 'female'}
                      onChange={() => setSex('female')}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId='addressFilter'>
                  <Form.Label>כתובת:</Form.Label>
                  <Form.Control
                    as='select'
                    multiple
                    size='lg'
                    value={selectedAddresses}
                    onChange={(e) =>
                      setSelectedAddresses(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    <option value="">בחר עיר</option>
                    {citiesArray.map((city) => (
                      <option key={city._id} value={city.שם_ישוב}>
                        {city.שם_ישוב}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowFilters(false)}>
            סגירה
          </Button>
        </Modal.Footer>
      </Modal> */}

      <div className='row g-2'>
        {teachersList.map((item) => {
          return <TeacherItem key={item._id} item={item} />;
        })}
        {teachersList.length < 1 && <h2>אופס... נראה שאין מורים במערכת עדיין!</h2>}
      </div>
    </div>
  );
}
