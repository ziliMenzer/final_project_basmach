import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
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
  // useEffect(() => {
  //   console.log(user);
  // }, [user])

  const doApi = async (_dataBody) => {
    try {
      let url = API_URL + '/users/login';
      const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
      console.log(data);

      if (data.token) {
        localStorage.setItem(TOKEN_NAME, data.token);
        const decodedToken = jwt_decode(data.token);
        const userRole = decodedToken.role;
        console.log(userRole)
        if (userRole === "teacher") {
          let url = API_URL + `/teachers/teacherInfo/${data.token._id}`;
          let teacher = await doApiGet(url);
          console.log("teacher", teacher.data);
          setUser(teacher.data);
          nav("/allStudents");
        }
        else if (userRole === "student") {
          const student_url = API_URL + '/students/studentInfo'
          const fullStudent = await doApiTokenGet(student_url, "GET", data.token);
          console.log(fullStudent.data);
          let teacher_id = fullStudent.data.teacher_id;
          console.log("student", fullStudent.data);
          setUser(fullStudent.data);
          if (teacher_id === "null") {
            nav("/allTeachersList");
          }
          else {
            nav("/studentHome")
          }
        }
        else if (userRole === "admin") {
          nav("/userList");
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
    <div className='container'>
      <h1 className='text-center'>Log in please</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow mx-auto'>
        <label>Email:</label>
        <input {...emailRef} type="text" className='form-control' />
        {errors.email && <div className="text-danger">Enter valid email</div>}

        <label>Password:</label>
        <input {...passwordRef} type="text" className='form-control' />
        {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
        <div>
          {!isSubmitted ?
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Log in
            </button>
            :
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="blue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="flex justify-center"
              visible={true}
            />

          }

        </div>
      </form>
    </div>
  )
}
