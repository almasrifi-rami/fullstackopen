import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_API_KEY

const iconUrl = 'https://openweathermap.org/img/wn/'


const DetailedCountry = ({ country }) => {
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const [temperature, setTemperature] = useState(0)
  const [icon, setIcon] = useState(null)
  const [wind, setWind] = useState(0)
  

  useEffect(() => {
    axios
      .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => {
        console.log(response.data)
        setTemperature(response.data.main.temp)
        setIcon(`${iconUrl}${response.data.weather[0].icon}@2x.png`)
        setWind(response.data.wind.speed)
      })
  }, [lat, lon])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => <li key={code}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {temperature} Celsius</p>
      <img src={icon} alt='Weather Icon' />
      <p>Wind {wind} m/s</p>
    </div>
  )
}

const CountryListItem = ({ country }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <p>
        {country.name.common} <button onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'}
        </button>
      </p>
      {show ? <DetailedCountry country={country} /> : null}
    </div>
  )
}

const FilteredCountries = ({ countries, search }) => {
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  if (search === '') {
    return null
  }

  if (filteredCountries.length === 0) {
    return <p>No matches found</p>
  } else if (filteredCountries.length === 1) {
    const matchingCountry = filteredCountries[0]
    return (
      <DetailedCountry country={matchingCountry} />
    )
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    filteredCountries.map(country => {
      return <CountryListItem key={country.cca3} country={country} />
    })
  )
}

export default FilteredCountries