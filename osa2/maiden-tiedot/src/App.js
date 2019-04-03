import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [shownCountries, setShownCountries] = useState([])

  const apiUrl = "https://restcountries.eu/rest/v2/all"

  const hook = () => {
    axios
      .get(apiUrl)
      .then(response => setCountries(response.data))
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    const value = event.target ? event.target.value : event

    setFilter(value)
    setShownCountries(
      countries.filter(country =>
        country.name.toLowerCase()
          .includes(value.toLowerCase()))
    )
  }

  return (
    <div>
      <div>
        <span>find countries </span>
        <input onChange={handleFilter} value={filter} />
      </div>
      <CountryList
        countries={shownCountries}
        filter={filter}
        handleFilter={handleFilter}
      />
    </div>
  )
}

export default App
