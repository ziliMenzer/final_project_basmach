import React from 'react'
import { API_URL, doApiMethodTokenNotStringify, doApiMethodToken } from '../services/apiService';

export default function UserItem(props) {
  let item = props.item;

  // משנה תפקיד של משתמש
  const onRoleClick = async () => {
    let bodyData;
    if (item.role == "user") {
      if (window.confirm(`האם אתה רוצה להפוך את  ${item.first_name} למורה?`)) {
        bodyData = { role: "teacher" }
      }
      else {
        bodyData = { role: "admin" }
      }
    }
    else if(item.role=="teacher"){
      bodyData = { role: "user" }
    }
    else {
      alert("לא ניתן לשנות משתמש זה")
    }

    let url = API_URL + "/users/changeRole/" + item._id;
    try {
      let resp = await doApiMethodTokenNotStringify(url, "PATCH", bodyData)
      // console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      // console.log(err.response);
      alert("התרחשה שגיאה או שינוי לא חוקי של משתמש");
    }
  }
  const onActiveClick = async () => {
    let bodyData;
    if (item.active == true) {
      bodyData = { active: false }
    }
    else {
      bodyData = { active: true }
    }

    let url = API_URL + "/users/changeActive/" + item._id;
    try {
      let resp = await doApiMethodTokenNotStringify(url, "PATCH", bodyData)
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("התרחשה שגיאה או שינוי לא חוקי של משתמש");
    }
  }
  const onDelClick = async () => {
    if (window.confirm("האם למחוק את:" + item.first_name+"?")) {
      try {
        let url = API_URL + "/users/" + item._id;
        let resp = await doApiMethodToken(url, "DELETE");
        console.log(resp.data);
        if (resp.data.deletedCount == 1) {
          props.doApi();
        }
      }
      catch (err) {
        console.log(err.response);
        alert("התרחשה שגיאה, נסה שוב מאוחר יותר")
      }

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
      <td>{item.address}</td>
      <td>
        <button onClick={onActiveClick}>
          {String(item.active)}
        </button>
      </td>
      <td>
        <button className='badge bg-danger' onClick={onDelClick}>Delete User</button>
      </td>
    </tr>
  )
}
