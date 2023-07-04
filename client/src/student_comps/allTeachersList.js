import React, { useState, useEffect } from 'react';
import TeacherItem from './teacherItem';
import { doApiGet, API_URL, TOKEN_NAME } from '../services/apiService';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default function AllTeachersList() {
  const [teachersList, setTeachersList] = useState([]);
  const [paymentRange, setPaymentRange] = useState({ min: 0, max: 100 });
  const [sex, setSex] = useState('');
  const [selectedAddresses, setSelectedAddresses] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + '/teachers/';
    try {
      const { data } = await doApiGet(url);
      console.log(data);
      let new_url;
      for (const element of data) {
        const encodedSearch = encodeURIComponent(element.user_id);
        new_url = API_URL + `/teachers/teacherInfo/${encodedSearch}`;
        console.log(new_url);
        let teacher = await doApiGet(new_url);
        console.log(teacher.data);
        setTeachersList((teachersList) => [...teachersList, teacher.data]);
      }
      console.log(teachersList);
    } catch (err) {
      console.log(err);
    }
  };

  const filterTeachers = () => {
    return teachersList.filter((teacher) => {
      // Filter by payment_per_lesson range
      const payment = teacher.payment_per_lesson;
      if (payment < paymentRange.min || payment > paymentRange.max) {
        return false;
      }

      // Filter by sex
      if (sex && teacher.sex !== sex) {
        return false;
      }

      // Filter by address
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
      <h2>Teachers List:</h2>

      <div className='filter-strip'>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group controlId='paymentRange'>
                <Form.Label>Payment Range</Form.Label>
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
                <Form.Label>Sex Filter</Form.Label>
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
                <Form.Label>Address Filter</Form.Label>
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
                  <option value='address1'>Address 1</option>
                  <option value='address2'>Address 2</option>
                  <option value='address3'>Address 3</option>
                  {/* Add more address options */}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>

      <div className='row g-2'>
        {filterTeachers().map((item) => {
          return <TeacherItem key={item._id} item={item} />;
        })}
        {teachersList.length < 1 && <h2>Loading....</h2>}
      </div>
    </div>
  );
}
