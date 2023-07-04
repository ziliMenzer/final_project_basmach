import React from 'react'

const InputPaymentPerLesson = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const defaultValue = props.defaultValue



    return (
        <>
            <div>
                <label htmlFor="payment_per_lesson" className="sr-only">
                    {label}                                
                </label>
                <input defaultValue={defaultValue} {...register('payment_per_lesson', { required: { value: true, message: 'Payment per lesson is requried' } })}
                    id="payment_per_lesson"
                    name="payment_per_lesson"
                    type="text"
                    className={className}
                    placeholder="Payment per lesson" />
                {errors.payment_per_lesson && errors.payment_per_lesson.type == 'required' && <div className='text-danger font-bold bg-red-800 border-gray-300  py-1'>{errors?.payment_per_lesson?.message}</div>}
            </div>
        </>
    )
}

export default InputPaymentPerLesson
