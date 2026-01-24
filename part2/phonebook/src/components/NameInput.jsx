const NameInput = ({ newName, handlePersonChange }) => {
  return (
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
  )
}

export default NameInput