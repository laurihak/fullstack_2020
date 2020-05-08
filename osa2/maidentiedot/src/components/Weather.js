import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = "http://api.weatherstack.com/current"
const api_key = process.env.REACT_APP_API_KEY


const Weather = (props) => {
    const [weather, setWeather] = useState([])

      useEffect(() => {
            axios
            .get(`${apiUrl}?access_key=${api_key}&query=${props.city}`)
            .then(response => {
                    setWeather(response.data)
            }).catch((e) =>  {
                throw e
            })
    }, [props.city])


    if (weather !== null) {
        return (
            <div>
                <h2>Weather in {props.city}</h2>
                <p>Temperature {weather.current ? weather.current.temperature : "none"}</p>
                <p>Wind {weather.current ? weather.current.wind_speed: "none"}</p> 
                <p>Uv index {weather.current ? weather.current.uv_index : "none"}</p>
                <img src={weather.current ? weather.current.weather_icons[0] : "none"} alt="was not found" />
            </div>
        )
    } else {
        return (
            <div>
                Säätiedot ei saatavilla
            </div>
        )
    }
}


export default Weather
