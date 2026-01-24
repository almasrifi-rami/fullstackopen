const NumberInput = ({ newNumber, handleNumberChange }) => {
  return (
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
  )
}

export default NumberInput