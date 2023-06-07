import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';

function UpdateHousingScheme() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

  useEffect( () => {
    fetchData();
}, [])

    const fetchData = async () => {
        if(location.state === null){
            navigate('/login');
        }
        else{

        
        const response = await axios.post('http://localhost:3000/admin/getByNameHousingScheme', {Title: location.state.Title} ,{
            headers: {
              token: localStorage.getItem('token')
            }
          });
          console.log(response)
        
          setTitle(response.data.product[0].Title)
          setDescription(response.data.product[0].Description)
          setEmail(response.data.product[0].Email)
          setCity(response.data.product[0].City)
          setState(response.data.product[0].State)
          setCountry(response.data.product[0].Country)
        }
    }

  const handleUpdate = () => {
    axios
      .put('http://localhost:3000/admin/updateHousingScheme', {
        Title: title,
        Description: description,
        Email: email,
        City: city,
        State: state,
        Country: country
      })
      .then((response) => {
        if (response.data.product) {
          setMessage('Housing scheme successfully updated');
        } else {
          setMessage('No such product exists in the database');
        }
      })
      .catch((error) => {
        setMessage('Error updating housing scheme');
        console.error('Error updating housing scheme:', error);
      });
  };

  return (
    <div>
      <h2>Update Housing Scheme</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Housing Scheme
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateHousingScheme;
