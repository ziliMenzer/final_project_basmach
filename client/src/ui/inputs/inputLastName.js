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
                <label htmlFor="last_name" className="sr-only">
                    {label}                      
                </label>
                <input defaultValue={defaultValue}
                    {...register('last_name', { required: { value: true, message: 'last name is requried' }, minLength: { value: 2, message: "last name must be at least 2 characters" } })}
                    id=" last_name"
                    name="last_name"
                    type="text"
                    className={className}
                    placeholder="Last name" />
                {errors.last_name && errors.last_name.type == 'minLength' && <div className='font-bold bg-red-800 border-gray-300  py-1'>{errors?.last_name?.message}</div>}
                {errors.last_name && errors.last_name.type == 'required' && <div className='font-bold bg-red-800 border-gray-300  py-1'>{errors?.last_name?.message}</div>}
            </div>
        </>
    )
}

export default InputLastName