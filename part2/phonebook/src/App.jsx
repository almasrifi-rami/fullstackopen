import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handlePersonChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleSearch = event => setSearchName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber, id: persons.length + 1}

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} />
    </div>
  )
}

export default App