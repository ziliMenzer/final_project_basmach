import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/userProvider';
import "./studentHome.css";
import { Form, FormControl, Button } from 'react-bootstrap';
import { doApiTokenGet, doApiMethodToken, API_URL, TOKEN_NAME } from '../services/apiService';



export default function StudentHome() {
    const { user, setUser, updateUserDetails } = useContext(AppContext);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setName(user.first_name + " " + user.last_name);
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedName(name);
        setEditedEmail(email);
        setEditedPhone(phone);
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        // Perform any validation if needed

        // Update the field values in the state
        setName(editedName);
        setEmail(editedEmail);
        setPhone(editedPhone);
        setIsEditing(false);

        // Update the user context value with the edited details
        updateUserDetails({
            first_name: editedName.split(' ')[0],
            last_name: editedName.split(' ')[1],
            email: editedEmail,
            phone: editedPhone
        });
        try {
            let url = API_URL + `/students/${user._id}`;
            const { data } = await doApiMethodToken(url, "PUT", {
                user_id: user.user_id,
                status: {},
                subjects_array: {},
                teacher_id: user.teacher_id,
                number_of_lessons: user.number_of_lessons,
                debt: user.debt
            });
            setUser(data)
        }
        catch (err) {
            console.log(err)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the respective edited field value in the state
        if (name === 'name') {
            setEditedName(value);
        } else if (name === 'email') {
            setEditedEmail(value);
        } else if (name === 'phone') {
            setEditedPhone(value);
        }
    };




    return (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="cl1 col-md-4 gradient-custom text-center text-white">

                                    <img src={user.profile_image}
                                        alt="profile image" className="rounded-circle shadow-4-strong my-5 " />

                                    <h5>{user.first_name + " " + user.last_name}</h5>
                                    <p>hii</p>
                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <form onSubmit={handleSaveClick}>
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <label className='label'>Email</label>
                                                    {isEditing ? (
                                                        <input type="text" name="email" defaultValue={editedEmail} onChange={handleInputChange} />
                                                    ) : (
                                                        <span>{user.email}</span>
                                                    )}
                                                    {/* <input readonly="readonly" type="text" defaultValue={user.email} className='form-control-plaintext text-muted border-0'/> */}
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label className='label'>Phone</label>
                                                    {isEditing ? (
                                                        <input type="text" name="phone" defaultValue={editedPhone} onChange={handleInputChange} />
                                                    ) : (
                                                        <span>{user.phone}</span>
                                                    )}
                                                    {/* <p className="text-muted">{user.phone}</p> */}
                                                </div>
                                            </div>
                                            <h6>More detailes</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Status</h6>
                                                    <p className="text-muted">{user.status}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Num of lessons</h6>
                                                    <p className="text-muted">{user.number_of_lessons}</p>
                                                </div>
                                            </div>
                                            {isEditing ? (
                                                <>
                                                    <button type="submit" onClick={handleSaveClick}>Save</button>
                                                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                                </>
                                            ) : (
                                                <button onClick={handleEditClick}>Edit Details</button>
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
    )
}