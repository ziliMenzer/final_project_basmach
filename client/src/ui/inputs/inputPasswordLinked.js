import React from 'react'
import { regPassword } from '../../services/apiService';

const InputPasswordLinked = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue


    return (
        <>
            <div>
                <label htmlFor="password" className="sr-only">
                    {label}
                </label>
                <input defaultValue={defaultValue} 
                {...register('password', { required: { value: true, pattern: regPassword, message: 'Password is requried' }, minLength: { value: 6, message: "Password between 6-16 chars Must contain 1 letter and 1 sign." }, maxLength: { value: 16, message: "Password between 6-16 chars - 16 max !" } })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={className}
                    placeholder="Password"
                />
                {errors.password && errors.password.type == 'required' && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.password?.message}</p>}
                {errors.password && errors.password.type == 'minLength' && <p className='text-white font-bold bg-red-800 text-center   border-gray-300  py-1'>{errors?.password?.message}</p>}
                {errors.password && errors.password.type == 'maxLength' && <p className='text-white font-bold bg-red-800 text-center   border-gray-300  py-1'>{errors?.password?.message}</p>}
            </div>
            
        </>
    )
}

export default InputPasswordLinked
