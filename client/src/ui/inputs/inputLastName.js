import React from 'react'

const InputLastName = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue

    return (
        <>
            <div>
                <label htmlFor="lastName" className="sr-only">
                    {label}                      </label>
                <input defaultValue={defaultValue}
                    {...register('fullName[lastName]', { required: { value: true, message: 'last name is requried' }, minLength: { value: 2, message: "last name must be at least 2 characters" } })}
                    id=" lastName"
                    name="fullName[lastName]"
                    type="text"
                    className={className}
                    placeholder="Last name" />
                {errors.fullName && errors.fullName.lastName.type == 'minLength' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.lastName?.message}</div>}
                {errors.fullName && errors.fullName.lastName.type == 'required' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.lastName?.message}</div>}
            </div>
        </>
    )
}

export default InputLastName