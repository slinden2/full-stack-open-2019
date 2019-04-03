import React from 'react';
import Weather from './Weather'

const SingleCountry = (country) => {

  return (
    <div>
      <div>
        <h1>{country[0].name}</h1>
        <p>
          capital {country[0].capital} <br />
          population {country[0].population}
        </p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {country[0].languages
            .map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
      </div>
      <div>
        <img src={country[0].flag} alt={`flag of ${country[0].name}`} width="150" />
      </div>
      <Weather city={country[0].capital} />
    </div>

  )
}

export default SingleCountry
