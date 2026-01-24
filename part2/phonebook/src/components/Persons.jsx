import Person from './Person'


const Persons = ({ persons, searchName }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(
    searchName.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </div>
    )
}

export default Persons