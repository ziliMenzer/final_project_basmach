import React from 'react'

const InputAddressLinked = (props) => {
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
                    {...register('adress', { required: { value: true, message: 'address is requried' }, minLength: { value: 2, message: "address must be at least 2 characters"} })}
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address"
                    className={className}
                    placeholder="address" />
                {errors.address && errors.address.type == 'minLength' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.address?.message}</div>}
                {errors.address && errors.address.type == 'required' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.address?.message}</div>}
            </div>

        </>
    )
}

export default InputAddressLinked
