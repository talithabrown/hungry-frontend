import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
        alert('Please fill out both username and passowrd')
        return
    }

    onLogin(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <form className='login-form' onSubmit={onSubmit}>
      <h2>LOGIN</h2>
        <div className='form-control'>
            <label>Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="buttonHolderDiv">
          <input className="submit" type='submit' value='Login' />
        </div>
    </form>
  )
}

export default LoginForm