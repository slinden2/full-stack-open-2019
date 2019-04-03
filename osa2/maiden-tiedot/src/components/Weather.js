import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const apiUrl = "http://api.apixu.com/v1/current.json?key="
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY

  const temperature = weather.current ? weather.current.temp_c : ""
  const weatherCond = weather.current ? weather.current.condition.icon : ""
  const wind = weather.current ? weather.current.wind_kph : ""

  const hook = () => {
    axios
      .get(`${apiUrl}${apiKey}&q=${city}`)
      .then(response => setWeather(response.data))
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <p>
          <b>temperature:</b> {temperature} <br />
          <img src={weatherCond} alt={`conditions in ${city}`} /> <br />
          <b>wind:</b> {wind}
        </p>
      </div>
    </div>
  )
}

export default Weather