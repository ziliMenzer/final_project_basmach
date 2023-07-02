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
                <label htmlFor="first_name" className="sr-only">
                    {label}                                
                </label>
                <input defaultValue={defaultValue} {...register('first_name', { required: { value: true, message: 'First name is requried' }, minLength: { value: 2, message: "First name must be at least 2 characters" } })}
                    id="first_name"
                    name="first_name"
                    type="text"
                    className={className}
                    placeholder="First name" />
                {errors.first_name && errors.first_name.type == 'minLength' && <div className='text-white font-bold bg-red-800 border-gray-300  py-1'>{errors?.first_name?.message}</div>}
                {errors.first_name && errors.first_name.type == 'required' && <div className='text-white font-bold bg-red-800 border-gray-300  py-1'>{errors?.first_name?.message}</div>}
            </div>
        </>
    )
}

export default InputFirstName
