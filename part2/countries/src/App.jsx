import { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredCountries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input value={search} onChange={event => setSearch(event.target.value)}></input>
      <FilteredCountries countries={countries} search={search} />
    </div>
  )
}

export default App