import React from 'react'

const InputFirstName = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue



    return (
        <>
            <div>
                <label htmlFor="firstName" className="sr-only">
                    {label}                                </label>
                <input defaultValue={defaultValue} {...register('fullName[firstName]', { required: { value: true, message: 'First name is requried' }, minLength: { value: 2, message: "First name must be at least 2 characters" } })}
                    id="firstName"
                    name="fullName[firstName]"
                    type="text"
                    className={className}
                    placeholder="First name" />
                {errors.fullName && errors.fullName.firstName.type == 'minLength' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.firstName?.message}</div>}
                {errors.fullName && errors.fullName.firstName.type == 'required' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.firstName?.message}</div>}
            </div>
        </>
    )
}

export default InputFirstName
