import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'





function App() {
  const [filter, setFilter] = useState([])
  const [countries, setCountries] = useState([])


  useEffect(() => {
    let get = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(get)
      .then(response => {
        if (response.data.length > 0) {
          setCountries(response.data)
        }
      })
  }
    , [])

  const inputChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  const handleShow = (props) => {
    setFilter(props)
  }


  return (
    <div>
      Find countries:
      <input value={filter} onChange={inputChange} />
      <h2>Countries</h2>
      <Countries maat={countries} filter={filter} handleShow={handleShow}/>
    </div>

  )
}

export default App;

