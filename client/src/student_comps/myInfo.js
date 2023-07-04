import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/userProvider';
import "./myInfo.css";
import HeaderStudent from '../layout/headerStudent';
import { Form, FormControl, Button } from 'react-bootstrap';
import { doApiTokenGet, doApiMethodToken, API_URL, TOKEN_NAME } from '../services/apiService';
import axios from 'axios';



export default function MyInfo() {
    
    const { user, setUser } = useContext(AppContext);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(address)
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedFirstName(first_name);
        setEditedLastName(last_name);
        setEditedEmail(email);
        setEditedPhone(phone);
        setEditedAddress(address);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        // Perform any validation if needed

        // Update the field values in the state
        setFirstName(editedFirstName);
        setLastName(editedLastName);
        setEmail(editedEmail);
        setPhone(editedPhone);
        setAddress(editedAddress);
        setIsEditing(false);

        try {
            let url = API_URL + `/users/${user.user_id}`;
            const info = { 
                first_name: editedFirstName,
                last_name: editedLastName,
                email: editedEmail,
                phone: editedPhone,
                password: user.password,
                address: editedAddress,
                profile_image: user.profile_image,
                role: user.role
            };
            const { data } = await doApiMethodToken(url, "PUT", info);
            console.log(info)
            setUser(data)
        }
        catch (err) {
            console.log(err)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the respective edited field value in the state
        if (name === 'first_name') {
            setEditedFirstName(value);
        }else if(name === 'last_name'){
            setEditedLastName(value);
        } else if (name === 'email') {
            setEditedEmail(value);
        } else if (name === 'phone') {
            setEditedPhone(value);
        } else if (name === 'address') {
            setEditedAddress(value);
        }
    };




    return (
        <div>
        {/* <HeaderStudent/> */}
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-10 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="cl1 col-md-4 gradient-custom text-center text-white">

                                    <h5 className='mt-0'>{user.first_name + " " + user.last_name}</h5>
                                    <img src={user.profile_image}
                                        alt="profile image" className="rounded-circle shadow-4-strong mx-auto w-75 h-50" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <form onSubmit={handleSaveClick}>
                                            <h6>פרטים אישיים</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <label className='label'>מייל</label>
                                                    <div>
                                                    {isEditing ? (
                                                        <input type="text" name="email" value={editedEmail} onChange={handleInputChange} />
                                                    ) : (
                                                        <span>{user.email}</span>
                                                    )}
                                                    </div>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className='label'>טלפון</label>
                                                    <div>
                                                    {isEditing ? (
                                                        <input type="text" name="phone" value={editedPhone} onChange={handleInputChange} />
                                                    ) : (
                                                        <span>{user.phone}</span>
                                                    )}
                                                    </div>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className='label'>כתובת</label>
                                                    <div>
                                                    {isEditing ? (
                                                        <input type="text" name="address" value={editedAddress} onChange={handleInputChange} />
                                                    ) : (
                                                        <span>{user.address}</span>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                            <h6>פרטים נוספים</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>סטטוס</h6>
                                                    <p className="text-muted">{user.status}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>מספר שיעורים</h6>
                                                    <p className="text-muted">{user.number_of_lessons}</p>
                                                </div>
                                            </div>
                                            {isEditing ? (
                                                <>
                                                    <button className='btn-form p-2 rounded-pill' type="submit" onClick={handleSaveClick}>שמירה</button>
                                                    <button className='btn-form mx-2 p-2 rounded-pill' type="button" onClick={() => setIsEditing(false)}>ביטול</button>
                                                </>
                                            ) : (
                                                <button className='btn-form p-2 rounded-pill' onClick={handleEditClick}>עריכה</button>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}