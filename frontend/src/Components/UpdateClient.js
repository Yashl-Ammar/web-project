import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';

function UpdateClient() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const location =  useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    fetchData();
}, [])

    const fetchData = async () => {
        if(location.state === null){
            navigate('/login');
        }
        else{
            const response = await axios.post('http://localhost:3000/admin/getByNameClientUser', {name: location.state.name} ,{
                headers: {
                token: localStorage.getItem('token')
                }
            });
            console.log(response)
            
            setEmail(response.data.client[0].email)
            setName(response.data.client[0].name)
            setContactNo(response.data.client[0].contactNo)
            setPassword(response.data.client[0].password)
            setAddress(response.data.client[0].address)
        }
    }

  const handleUpdate = () => {
    axios
      .put('http://localhost:3000/admin/updateClientUser', {
        email,
        name,
        contactNo,
        password,
        address
      },{
        headers: {
            token: localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data.client) {
          setMessage('Client successfully updated');
        } else {
          setMessage('No such client exists in the database');
        }
      })
      .catch((error) => {
        setMessage('Error updating client');
        console.error('Error updating client:', error);
      });
  };

  return (
    <div>
      <h2>Update Client User</h2>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Client
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateClient;
