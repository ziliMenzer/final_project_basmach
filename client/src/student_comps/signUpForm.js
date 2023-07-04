import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputFirstName from '../ui/inputs/inputFirstName';
import InputLastName from '../ui/inputs/inputLastName';
import InputPasswordLinked from '../ui/inputs/inputPasswordLinked';
import InputEmailLinked from '../ui/inputs/inputEmailLinked';
import InputPhoneLinked from '../ui/inputs/inputPhoneLinked';
import InputConfirmPassword from '../ui/inputs/inputConfirmPassword';
import FilterCities from '../ui/inputs/filterCities';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const SignUpForm = (props) => {
    let { register, getValues, formState: { errors } } = useForm();
    const setData = props.setData;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(firstName);
        console.log(lastName);
        let user = {first_name: firstName, last_name: lastName, email: email, phone: phone, address: city, password: password};
        console.log(user);
        setData(user);


        return () => {
            setData(user)
        }
    },[])

    return (
        <div className="form -space-y-px rounded-md shadow-sm">
            <InputFirstName
                onChange={(event) => {
                    setFirstName(event.target.value)
                }}
                label={" שם פרטי "}
                register={register}
                errors={errors}
                className={"form-control mt-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputLastName
                onChange={(event) => {
                    setLastName(event.target.value)
                }}
                label={" שם משפחה "}
                register={register}
                errors={errors}
                className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputEmailLinked
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                label={" כתובת אימייל "}
                register={register}
                errors={errors}
                className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputPhoneLinked
                onChange={(event) => {
                    setPhone(event.target.value)
                }}
                label={" מספר פלפון "}
                register={register}
                errors={errors}
                className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <FilterCities
                onChange={(event) => {
                    setCity(event.target.value)
                }}
                label={" כתובת "}
                register={register}
                errors={errors}
                className={"form-control mt-2 relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
            />

            <InputPasswordLinked
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
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
        </div>

    )
}

export default SignUpForm;