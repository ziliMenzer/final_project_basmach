import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/userProvider';
import "./myInfo.css";
// import HeaderStudent from '../layout/headerStudent';
import { Form, FormControl, Button } from 'react-bootstrap';
import { doApiTokenGet, doApiMethodToken, API_URL, TOKEN_NAME, doApiMethodTokenNotStringify } from '../services/apiService';
import axios from 'axios';


export default function MyInfo() {

    const { user, setUser } = useContext(AppContext);
    const nav = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        console.log("user", user);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

  

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(first_name);
        setEditedLastName(last_name);
        setEditedEmail(email);
        setEditedPhone(phone);
    };
    const handleSaveClick = async (e) => {
        e.preventDefault();
        const { password, active, _id, date_created, __v, subjects_array, user_id, status, teacher_id, number_of_lessons, debt, ...userWithoutPassword } = user;
        const updatedUser = {
            ...userWithoutPassword,
            first_name: editedFirstName,
            last_name: editedLastName,
            email: editedEmail,
            phone: editedPhone,
        };
        try {
            let url = API_URL + `/users/${user.user_id}`;
            const { data } = await doApiMethodTokenNotStringify(url, "PUT", updatedUser);
            console.log(data);
            const newUser = {
                ...user,
                ...updatedUser
            };

            setUser(newUser);
        }
        catch (err) {
            console.log(err);
        }
        setIsEditing(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'first_name') {
            setEditedFirstName(value);
        } else if (name === 'last_name') {
            setEditedLastName(value);
        } else if (name === 'email') {
            setEditedEmail(value);
        } else if (name === 'phone') {
            setEditedPhone(value);
        }
    };
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-8 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="cl1 col-md-4 gradient-custom text-center text-white">

                                        <img src={user.profile_image}
                                            alt="profile image" className="rounded-circle shadow-4-strong my-5 " />

                                        <h5 defaultValue={user.first_name + " " + user.last_name}>{user.first_name + " " + user.last_name}</h5>
                                        <p>hii</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <form onSubmit={handleSaveClick}>
                                                <h6>פרטים אישיים</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <label className='label'>מייל</label>
                                                        {isEditing ? (
                                                            <input type="text" name="email" defaultValue={editedEmail} onChange={handleInputChange} />
                                                        ) : (
                                                            <span>{user.email}</span>
                                                        )}
                                                        {/* <input readonly="readonly" type="text" defaultValue={user.email} className='form-control-plaintext text-muted border-0'/> */}
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <label className='label'>טלפון</label>
                                                        {isEditing ? (
                                                            <input type="text" name="phone" defaultValue={editedPhone} onChange={handleInputChange} />
                                                        ) : (
                                                            <span>{user.phone}</span>
                                                        )}
                                                        {/* <p className="text-muted">{user.phone}</p> */}
                                                    </div>
                                                </div>
                                                <h6>פרטים נוספים</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>סטטוס</h6>
                                                        <p defaultValue={user.status} className="text-muted">{user.status}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>מספר שיעורים</h6>
                                                        <p defaultValue={user.number_of_lessons} className="text-muted">{user.number_of_lessons}</p>
                                                    </div>
                                                </div>
                                                {isEditing ? (
                                                    <>
                                                        <button className='rounded-pill' type="submit" onClick={handleSaveClick}>שמירה</button>
                                                        <button className='rounded-pill' type="button" onClick={() => setIsEditing(false)}>ביטול</button>
                                                    </>
                                                ) : (
                                                    <button className='rounded-pill' onClick={handleEditClick}>עריכה</button>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container py-5 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}