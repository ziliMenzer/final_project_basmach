import React,{useState} from 'react'
import UserItem from './userItem';

export default function UserList() {
    const [usersList,setUsersList]=useState([]);
  return (
    <div className='container'>
        <h2>Users List:</h2>
        {usersList.map(item=>{
            <UserItem key={item._id} item={item}/>
        })}
        {usersList.length<1 && <h2>Loading....</h2>}
    </div>
  )
}
