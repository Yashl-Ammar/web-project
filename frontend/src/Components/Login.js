import React, { useState,useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            navigate('/ClientManageScreen')
        }
    }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/admin/login', { username, password });
      const data = response.data;
  
      if (response.status === 200) {
        // Login successful, store the token in local storage
        const token = data.token;
        localStorage.setItem('token', token);

       
  
        navigate('/ClientManageScreen');
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
    <>
    <div>
      <div className="login-screen">
        <div className="login-container">
          <h2>Admin Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Login
            </Button>

            
          </Form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Login;
