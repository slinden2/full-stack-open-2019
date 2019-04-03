import React from 'react';
import SingleCountry from './SingleCountry'

const CountryList = ({ countries, filter, handleFilter }) => {
  if (!filter) return ""
  if (countries.length > 10) return "Too many matches, specify another filter"
  if (countries.length === 1) return SingleCountry(countries)
  if (countries.length === 0) return "No matches found"

  const countryItems = () => {
    return (
      countries
        .map(country =>
          <div key={country.alpha3Code}>
            <span>
              {country.name}{" "}
              <button onClick={() => handleFilter(country.name)}>show</button>
            </span><br />
          </div>)
    )
  }

  return (
    <div>
      {countryItems()}
    </div>
  )
}

export default CountryList