import React,{ useState , useEffect }  from 'react'
import { API_URL, doApiTokenGet } from '../services/apiService';
// import CheckAdminComp from '../checkAdminComp'
import UserItem from './userItem';

export default function UsersList() {
  const [usersArray,setUsersArray] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/users/getAllUsers";
    try{
      let resp = await doApiTokenGet(url);
      console.log(resp.data);
      setUsersArray(resp.data);
    }
    catch(err){
      console.log(err);
      alert("there problem ,try again later")
    }

  }


  return (
    <div className='container'>
      {/* <CheckAdminComp /> */}
      <h1>List of users in systems</h1>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Address</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {/* <tr>
      <td>{props.index + 1}</td>
      <td>{item.first_name} {item.last_name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>
        <button onClick={onRoleClick}>
          {item.role}
        </button>
      </td>
      <td>{item.rank}</td>
      <td>{item.address}</td>
      <td>{item.profile_image}</td>
      <td>
        <button onClick={onActiveClick}>
          {String(item.active)}
        </button>
      </td> */}
      {/* <td>
        <button className='badge bg-danger'>Delete User</button>
      </td> */}
          {usersArray.map((item,i) => {
            return(
              <UserItem key={item._id} doApi={doApi} index={i} item={item}/>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
