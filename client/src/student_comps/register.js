import React from 'react'
import { get, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { API_URL, doApiMethod, doApiMethodSignUpLogin } from '../services/apiService';
import InputFirstName from '../ui/inputs/inputFirstName';
import InputLastName from '../ui/inputs/inputLastName';
import InputPasswordLinked from '../ui/inputs/inputPasswordLinked';
import InputEmailLinked from '../ui/inputs/inputEmailLinked';
import InputPhoneLinked from '../ui/inputs/inputPhoneLinked';
import InputConfirmPassword from '../ui/inputs/inputConfirmPassword';
import FilterCities from '../ui/inputs/filterCities';
import './register.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SignUp = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);


    const nav = useNavigate();
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) => {
        delete _dataBody.confirmPassword
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/signup';
            const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
            // if (data.email) {
            //     nav(`/messages/?name=${data.fullName.firstName}`)
            // }
            // else {

            // }

            const student = {
                user_id: data._id
            }
            const url2 = API_URL + '/students/';
            const { data2 } = await doApiMethod(url2, "POST", student);
            nav("/allTeachersList")
        } catch (err) {
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
        }
    }

    return (
        <>
            <div className="register flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/* <img
                            className="mx-auto h-12 w-auto"
                            src=""
                            alt="Your Company"
                        /> */}
                        <h2 className="sign-up-header mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            הרשמה
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6 container" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />

                        <div className="form -space-y-px rounded-md shadow-sm">
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
                                    :
                                    "form-control mt-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                            />

                        </div>

                        <div>

                            {!isSubmitted ?
                                <button
                                    type="submit"
                                    className="btn-sign-up mx-auto group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
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
            </div>
        </>
    )
}

export default SignUp