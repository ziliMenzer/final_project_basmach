import React, { useState, useContext} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner'
import jwt_decode from 'jwt-decode';
import { doApiMethodSignUpLogin, doApiGet, doApiTokenGet, API_URL, TOKEN_NAME } from '../services/apiService';
import "./login.css";
import { AppContext } from "../context/userProvider"


export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const nav = useNavigate();
  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData);
  }

  const doApi = async (_dataBody) => {
    try {
      let url = API_URL + '/users/login';
      const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
      console.log(data.token);
      if (data.token) {
        localStorage.setItem(TOKEN_NAME, data.token);
        const decodedToken = jwt_decode(data.token);
        const userRole = decodedToken.role;
        console.log(decodedToken._id);
        //console.log(userRole)
        if (userRole === "teacher") {
          let url = API_URL + `/teachers/myInfo`;
          let teacher = await doApiTokenGet(url);
          console.log("teacher", teacher.data);
          setUser(teacher.data);
          nav("/allStudents");
        }
        else if (userRole === "student") {
          let student_url = API_URL + '/students/studentInfo'
          const fullStudent = await doApiTokenGet(student_url);
          console.log(fullStudent.data);
          let teacher_id = fullStudent.data.teacher_id;
          //console.log("student", fullStudent.data);
          console.log(teacher_id,"techer_id");
          setUser(fullStudent.data);
          
          if (teacher_id === "null") {
            nav("/allTeachersList");
          }
          else {
            nav("/progress")

          }
        }
        else if (userRole === "admin") {
          nav("/usersList");
        }
      }
      
    }
    catch (err) {
      setIsSubmitted(false);
      // alert(err.response.data.msg);
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef = register("password", { required: true, minLength: 3 });
  return (
<div className="container container1 my-5" id="container">
<Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
	<div className="form-container sign-in-container">
		<form className='form-login' onSubmit={handleSubmit(onSubForm)}>
			<h1>התחברות</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fa fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fa fa-google"></i></a>
				<a href="#" className="social"><i className="fa fa-linkedin"></i></a>
			</div>
			<span>או השתמש בחשבון שלך</span>
			<input {...emailRef} type="text" className='form-control' />
        {errors.email && <div className="text-danger">Enter valid email</div>}
        <input {...passwordRef} type="password" className='form-control' />
        {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
			<a href="#">שכחת סיסמה?</a>
			<button className="button-login" type="submit">התחבר</button>
		</form>
	</div>
	<div className="overlay-container">
			<div className="overlay-panel overlay-right w-100">
				<h1>שלום, חבר!</h1>
				<p>הזן את פרטיך האישיים והתחיל איתנו את המסע</p>
				<button className="ghost button-login" id="signUp" onClick={()=>nav('/routeRegister')}>הירשם</button>
			</div>
	</div>
</div>
   
  )
}
