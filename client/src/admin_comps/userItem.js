import React from 'react'

export default function UserItem(props) {
    let item = props.item;
  return (
    <div>
        <h2>{item.email}-{item.password}</h2>
    </div>
  )
}
