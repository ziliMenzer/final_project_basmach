import React from 'react'
import { regPhone } from '../../services/servise';

const InputPhoneLinked = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue

    // console.log(defaultValue)


    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label className="sr-only">
                    {label}
                </label>
                <input defaultValue={defaultValue}
                    {...register('phone', { required: { value: true, message: 'Phone is requried' }, pattern: regPhone, minLength: { value: 10, message: "Phone must be at least 10 characters" }, maxLength: { value: 15, message: "Phone cant be no more 15 characters" } })}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    className={className}
                    placeholder="Phone number" />
                {errors.phone && errors.phone.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center border-gray-300  py-1'>{errors?.phone?.message}</div>}
                {errors.phone && errors.phone.type === 'required' && <div className='text-white font-bold bg-red-800 text-center border-gray-300  py-1'>{errors?.phone?.message}</div>}
                {errors.phone && errors.phone.type === 'maxLength' && <div className='text-white font-bold bg-red-800 text-center border-gray-300  py-1'>{errors?.phone?.message}</div>}
            </div>

        </>
    )
}

export default InputPhoneLinked