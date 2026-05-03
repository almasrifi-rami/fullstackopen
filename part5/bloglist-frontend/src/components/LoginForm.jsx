import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = event => {
    event.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          <label>
            username:
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm
