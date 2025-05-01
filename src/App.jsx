import { useState, useEffect, use } from 'react'
import './App.css'
import './index.css'

function App() {
  
  const API_KEY = '3723e60cad6c21df66d3e0bb31da9bc8'

  const [weatherData, setWeatherData] = useState(null)

  const [city, setCity] = useState('london')

  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
        const response = await fetch(url)
        const data = await response.json()
        setWeatherData(data)
        console.log(data);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`)
        
        const forecastData = await response.json(forecastResponse)

        const dailyForecast = forecastData.list.filter(
          (item, index) => index % 8 === 0 // выбирается запись каждые 3 часа -> 8 записей в день -> 5 дней
        ) 
        setForecast(dailyForecast)
      } 
      catch (err) {
        console.log(err.message)
      }
    }
    fetchWeatherData(city)

  },[city])

  return (
    <div className="wrapper">
      {weatherData && weatherData.main && weatherData.weather && (
    <>
        <div className="header">
          <h1 className="city">{weatherData.name}</h1>
          <p className="temperature">{Math.round(weatherData.main.temp)}°F</p>
          <p className="condition">{weatherData.weather[0].main}</p>
        </div>
        <div className="weather-details">
          <div>
            <p>Humidity</p>
            <p style={{fontWeight:"bold"}}>{Math.round(weatherData.main.humidity)}%</p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p style={{fontWeight:"bold"}}>{Math.round(weatherData.wind.speed)} mph</p>
          </div>
        </div>
      </>
    )}
      {forecast.length > 0 && (
      <>
      <div className="forecast">
        <h2 className="forecast-header">5-Day Forecast</h2>
        <div className="forecast-days">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-day">
              <p>
                {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            </div>
          ))}
        </div>
      </div>
      </>)}
    </div>
    )} 

export default App
