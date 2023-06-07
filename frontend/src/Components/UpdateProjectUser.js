import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router';

function UpdateProjectUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect( () => {
        fetchData();
    }, [])
    
        const fetchData = async () => {
            const response = await axios.post('http://localhost:3000/admin/getByNameProjectUser', {Name: location.state.Name} ,{
                headers: {
                  token: localStorage.getItem('token')
                }
              });
              console.log(response)
            
              setEmail(response.data.ProjectUser[0].Email)
              setName(response.data.ProjectUser[0].Name)
              setPassword(response.data.ProjectUser[0].Password)
              setAccountNumber(response.data.ProjectUser[0].AccountNumber
                )
        }

  const handleUpdate = () => {
    axios
      .put('http://localhost:3000/admin/updateProjectUser', {
        Email: email,
        Name: name,
        Password: password,
        AccountNumber: accountNumber
      },{
        headers:{
            token:localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data.projectuser) {
          setMessage('Project user successfully updated');
        } else {
          setMessage('No such project user exists in the database');
        }
      })
      .catch((error) => {
        setMessage('Error updating project user');
        console.error('Error updating project user:', error);
      });
  };

  return (
    <div>
      <h2>Update Project User</h2>
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

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAccountNumber">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Project User
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateProjectUser;
