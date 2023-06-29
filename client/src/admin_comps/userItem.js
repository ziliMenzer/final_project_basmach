import React from 'react'
import { API_URL, doApiMethodToken } from '../services/apiService';

export default function UserItem(props) {
  let item = props.item;

  // משנה תפקיד של משתמש
  const onRoleClick = async () => {
    let bodyData;
    if (item.role == "user") {
      // if (confirm("האם אתה רוצה להפוך משתמש זה למורה?")==true) {
      //   bodyData = { role: "teacher" }
      // }
      // else {
        bodyData = { role: "admin" }
      //}
    }
    else {
      bodyData = { role: "user" }
    }

    let url = API_URL + "/users/changeRole/" + item._id;
    try {
      let resp = await doApiMethodToken(url, "PATCH", bodyData)
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There is  a problem, or you are trying to change superAdmin to user");
    }
  }
  const onActiveClick = async () => {
    let bodyData;
    if (item.active == "true") {
      bodyData = { active: false }
    }
    else {
      bodyData = { active: true }
    }

    let url = API_URL + "/users/changeActive/" + item._id;
    try {
      let resp = await doApiMethodToken(url, "PATCH", bodyData)
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There is  a problem, or you are trying to change superAdmin to user");
    }
  }
  return (
    <tr>
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
      </td>
      <td>
        <button className='badge bg-danger'>Delete User</button>
      </td>
    </tr>
  )
}
