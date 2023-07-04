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
    <div className='container text-center'>
      {/* <CheckAdminComp /> */}
      <h1>רשימת המשתמשים במערכת</h1>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>מייל</th>
            <th>טלפון</th>
            <th>תפקיד</th>
            <th>כתובת</th>
            <th>פעיל</th>
            <th>מחיקה</th>
          </tr>
        </thead>
        <tbody>
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
