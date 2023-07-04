import React from 'react'

const InputSex = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue

    return (
        <>
            <div>
                <label htmlFor="sex" className="sr-only">
                    {label}                                
                </label>
                <input defaultValue={defaultValue} {...register('sex', { required: { value: true, message: 'Sex is requried' } })}
                    id="sex"
                    name="sex"
                    type="text"
                    className={className}
                    placeholder="Sex" />
                {errors.sex && errors.sex.type == 'required' && <div className='text-white font-bold bg-red-800 border-gray-300  py-1'>{errors?.sex?.message}</div>}
            </div>
        </>
    )
}

export default InputSex
