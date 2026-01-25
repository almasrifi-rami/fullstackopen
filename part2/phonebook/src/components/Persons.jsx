const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <p key={person.id}>
            {person.name} {person.number} <button
            onClick={() => confirm(`Delete ${person.name}?`) && deletePerson(person)}>
              delete
            </button>
          </p>
        )
      })}
    </div>
    )
}

export default Persons