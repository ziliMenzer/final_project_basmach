import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FilterTeachers() {
    const [citiesArray, setCitiesArray] = useState([]);
    useEffect(() => {
        fetchCities();
    }, [])
    const fetchCities = async () => {
        let url = "https://data.gov.il/api/3/action/datastore_search?resource_id=ec172c08-27fe-4d97-960d-dabf741c077f&limit=1500"
        try {
            let resp = await axios.get(url);
            console.log(resp.data.result.records);
            setCitiesArray(resp.data.result.records);
        }
        catch (err) {
            console.log("err");
            alert("There problem")
        }
    }
    return (
        <div><ul>
            {citiesArray.map(item=>{
                return(
                    <li>{item._id}-{item.שם_ישוב}</li>
                )
            })}
        </ul></div>
    )
}
