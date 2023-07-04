import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FilterTeachers(props) {
  const errors = props.errors
  const register = props.register
  const label = props.label
  const className = props.className

  const [citiesArray, setCitiesArray] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    let url = "https://data.gov.il/api/3/action/datastore_search?resource_id=ec172c08-27fe-4d97-960d-dabf741c077f&limit=1500";
    try {
      let resp = await axios.get(url);
      setCitiesArray(resp.data.result.records);
    } catch (err) {
      console.log("Error");
      alert("There is a problem");
    }
  };

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <label htmlFor="payment_per_lesson" className="sr-only">
        {label}
      </label>
      <select {...register('address', { required: { value: true, message: 'Address is requried' } })}
        value={selectedCity} onChange={handleChange} className={className}>
        <option value="">בחר עיר</option>
        {citiesArray.map((city) => (
          <option key={city._id} value={city.שם_ישוב}>
            {city.שם_ישוב}
          </option>
        ))}
      </select>
      {selectedCity && <p>העיר הנבחרה: {selectedCity}</p>}
      {errors.address && <p className='text-danger font-bold bg-red-800 border-gray-300  py-1  rounded-b-md'>Address is requierd</p>}

    </div>
  );
}
