import { useState } from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      })
      setToken(response.data.token)
      setMessage('Login successful! Token: ' + response.data.token)
      localStorage.setItem('token', response.data.token)
    } catch (error: any) {
      setMessage('Login failed: ' + (error.response?.data?.error || 'Unknown error'))
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
      {message && <p>{message}</p>}
      {token && <p>Token stored in localStorage</p>}
    </div>
  )
}

export default App