import NameInput from './NameInput'
import NumberInput from './NumberInput'

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <NameInput newName={newName} handlePersonChange={handlePersonChange} />
        <NumberInput newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm