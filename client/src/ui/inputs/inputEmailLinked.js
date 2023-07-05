import React from 'react'
import { regEmail } from '../../services/apiService';

const InputEmailLinked = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className

    return (
        <>
            <div>
                <label htmlFor="email-address" className="sr-only">
                    {label}                
                </label>
                <input {...register('email', { required: true, pattern: regEmail })}
                    id="email-address"
                    name="email"
                    type="text"
                    autoComplete="email"
                    className={className}
                    placeholder="כתובת אימייל"
                />
                {errors.email && <p className='text-danger font-bold bg-red-800 border-gray-300  py-1'>Enter valid email</p>}
            </div>
        </>
    )
}

export default InputEmailLinked