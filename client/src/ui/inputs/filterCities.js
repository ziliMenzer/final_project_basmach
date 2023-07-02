import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function FilterCities(props) {
  const errors = props.errors
  const register = props.register
  const label = props.label

  const [citiesArray, setCitiesArray] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    let url =
      'https://data.gov.il/api/3/action/datastore_search?resource_id=ec172c08-27fe-4d97-960d-dabf741c077f&limit=1500';
    try {
      let resp = await axios.get(url);
      setCitiesArray(resp.data.result.records);
    } catch (err) {
      console.log('Error');
      alert('There is a problem');
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const cityOptions = citiesArray.map((city) => ({
    value: city.שם_ישוב,
    label: city.שם_ישוב,
  }));

  return (
    <div>
      <label htmlFor="address" className="sr-only">
        {label}
      </label>
      <Select {...register('address', { required: { value: true, message: 'address is requried' } })}
        options={cityOptions}
        value={selectedCity}
        onChange={handleChange}
        isClearable
        placeholder="Select a city"
      />
      {selectedCity && (
        <p>Selected City: {selectedCity.label || selectedCity.value}</p>
      )}
      {errors.address.type == 'required' && <div className='font-bold bg-red-800 border-gray-300  py-1'>{errors?.address?.message}</div>}
    </div>
  );
}