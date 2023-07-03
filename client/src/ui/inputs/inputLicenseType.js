import React from 'react'

const InputLicenseType = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue

    return (
        <>
            <div>
                <label htmlFor="license_type" className="sr-only">
                    {label}                                
                </label>
                <input defaultValue={defaultValue} {...register('license_type', { required: { value: true, message: 'License type is requried' } })}
                    id="license_type"
                    name="license_type"
                    type="text"
                    className={className}
                    placeholder="License type" />
                {errors.license_type && errors.license_type.type == 'required' && <div className='text-white font-bold bg-red-800 border-gray-300  py-1'>{errors?.license_type?.message}</div>}
            </div>
        </>
    )
}

export default InputLicenseType
