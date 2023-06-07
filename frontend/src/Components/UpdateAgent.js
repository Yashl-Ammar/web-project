import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router';

function UpdateAgentUser() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();

    console.log(location.state.name)

  useEffect( () => {
    fetchData();
}, [])

    const fetchData = async () => {
        const response = await axios.post('http://localhost:3000/admin/getByNameAgentUser', {fname: location.state.name} ,{
            headers: {
              token: localStorage.getItem('token')
            }
          });
          console.log(response)
        
          setUsername(response.data.agent[0].username)
          setFirstName(response.data.agent[0].fname)
          setLastName(response.data.agent[0].lname)
          setEmail(response.data.agent[0].email)
          setPassword(response.data.agent[0].password)
          setContactNo(response.data.agent[0].contactNo)
    }

  const handleUpdate = () => {
    axios
      .put('http://localhost:3000/admin/updateAgentUser', {
        username,
        fname: firstName,
        lname: lastName,
        email,
        password,
        contactNo
      },{
        headers:{
            token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data.agent) {
          setMessage('Agent successfully updated');
        } else {
          setMessage('No such agent exists in the database');
        }
      })
      .catch((error) => {
        setMessage('Error updating agent');
        console.error('Error updating agent:', error);
      });
  };

  return (
    <div>
      <h2>Update Agent User</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Form.Group controlId="formContactNo">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Agent
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateAgentUser;
