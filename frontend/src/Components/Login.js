import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/login', { username, password });
      const data = response.data;
  
      if (response.status === 200) {
        // Login successful, store the token in local storage
        const token = data.token;
        localStorage.setItem('token', token);

        alert("success");
  
        // Redirect or navigate to another page
        // ...
      } else {
        // Login failed, display error message
        setErrorMessage(data.Message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login.');
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
