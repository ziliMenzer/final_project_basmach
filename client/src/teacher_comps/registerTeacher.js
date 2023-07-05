import React from 'react'
import { get, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { API_URL, doApiMethod, doApiMethodSignUpLogin } from '../services/apiService';
import InputSex from '../ui/inputs/inputSex';
import InputPaymentPerLesson from '../ui/inputs/inputPaymentPerLesson';
import InputLicenseType from '../ui/inputs/inputLicenseType';
import InputFirstName from '../ui/inputs/inputFirstName';
import InputLastName from '../ui/inputs/inputLastName';
import InputPasswordLinked from '../ui/inputs/inputPasswordLinked';
import InputEmailLinked from '../ui/inputs/inputEmailLinked';
import InputPhoneLinked from '../ui/inputs/inputPhoneLinked';
import InputConfirmPassword from '../ui/inputs/inputConfirmPassword';
import FilterCities from '../ui/inputs/filterCities';
import _ from 'lodash';
import '../student_comps/register.css'
import { AppContext } from '../context/userProvider';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const RegisterTeacher = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isContinue, setisContinue] = useState(false);
    const [details, setDetails] = useState({});
    const { setUser } = useContext(AppContext)
    const nav = useNavigate();
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();


    const onSub = (_dataBody) => {
        if (!isContinue) {
            delete _dataBody.confirmPassword
            setIsSubmitted(true);
            doApi(_dataBody);
        }
        else {
            setisContinue(true);
            setDetails(_dataBody);
        }
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/signup';
            console.log(_dataBody)
            const user = {
                first_name: _dataBody.first_name, last_name: _dataBody.last_name,
                email: _dataBody.email, phone: _dataBody.phone, address: _dataBody.address, password: _dataBody.password, role: "user"
            }
            const { data } = await doApiMethodSignUpLogin(url, "POST", user);

            const teacher = {
                user_id: data._id,
                sex: _dataBody.sex,
                payment_per_lesson: _dataBody.payment_per_lesson,
                license_type: _dataBody.license_type
            }
            console.log(teacher)
            const url2 = API_URL + '/teachers/';
            const { data2 } = await doApiMethod(url2, "POST", teacher);
            let userState = {
                ...data,
                ...data2
            }
            setUser(userState);
            nav("/confirmation")
        } catch (err) {
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div>
                    <h2 className="sign-up-header mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        הרשמה
                    </h2>
                </div>
                <div className="container container1 container2 my-4" id="container">
                    <Helmet>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    </Helmet>
                    <div className='form-container sign-up-container'>
                        <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6 container pt-3" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <InputFirstName
                                    label={" שם פרטי "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputLastName
                                    label={" שם משפחה "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputEmailLinked
                                    label={" כתובת אימייל "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputPhoneLinked
                                    label={" מספר פלפון "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <FilterCities
                                    label={" כתובת "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputPasswordLinked
                                    label={" סיסמא "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputConfirmPassword
                                    getValues={getValues}
                                    label={"אישור סיסמא"}
                                    register={register}
                                    errors={errors}
                                    className={classNames(errors.confirmPassword ? "relative mt-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        : "form-control mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                />

                                <InputLicenseType
                                    label={" סוג רישיון "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputSex
                                    label={" מין "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />

                                <InputPaymentPerLesson
                                    label={" תשלום לשיעור בודד "}
                                    register={register}
                                    errors={errors}
                                    className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                />
                            </div>

                            <div>
                                {!isSubmitted ?
                                    <button
                                        type="submit"
                                        className="btn-sign-up group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
                                    >
                                        הרשמה
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
                    <div className="overlay-container text-white">
                        <div className="overlay-panel overlay-right w-100">
                            <h1>שלום, חבר!</h1>
                            <p>הזן את פרטיך האישיים והתחיל איתנו את המסע</p>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default RegisterTeacher;