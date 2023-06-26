import React from 'react'

export default function TeacherItem(props) {
    let item = props.item;
  return (
    <div className='col-md-4'>
        <h2>license_type: {item.license_type}</h2>
        <h2>rating {item.rating}</h2>
    </div>
  )
}
