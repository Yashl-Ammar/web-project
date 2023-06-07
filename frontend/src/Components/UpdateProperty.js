import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';

function UpdateProperty() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [landline, setLandline] = useState('');
  const [message, setMessage] = useState('');
  const navlocation = useLocation();
  const navigate = useNavigate();

  useEffect( () => {
    fetchData();
}, [])

    const fetchData = async () => {
        if(navlocation.state === null){
            navigate('/login');
        }
        else{

        
        const response = await axios.post('http://localhost:3000/admin/getByNameProperty', {Title: navlocation.state.Title} ,{
            headers: {
              token: localStorage.getItem('token')
            }
          });
          console.log(response)
        
          setTitle(response.data.property[0].Title)
          setDescription(response.data.property[0].name)
          setPurpose(response.data.property[0].description)
          setPropertyType(response.data.property[0].propertytype)
          setCity(response.data.property[0].city)
          setLocation(response.data.property[0].location)
          setArea(response.data.property[0].Area)
          setLength(response.data.property[0].length)
          setWidth(response.data.property[0].width)
          setEmail(response.data.property[0].email)
          setMobileNo(response.data.property[0].mobileNo)
          setLandline(response.data.property[0].landline)
        }
    }

  const handleUpdate = () => {
    axios
      .put('http://localhost:3000/admin/updateProperty', {
        Title: title,
        description,
        purpose,
        propertytype: propertyType,
        city,
        location,
        Area: area,
        length,
        width,
        email,
        mobileNo,
        landline
      },{
        headers:{
            token:localStorage.getItem('token')
        }
      })
      .then((response) => {
        if (response.data.property) {
          setMessage('Property successfully updated');
        } else {
          setMessage('No such property exists in the database');
        }
      })
      .catch((error) => {
        setMessage('Error updating property');
        console.error('Error updating property:', error);
      });
  };

  return (
    <div>
      <h2>Update Property</h2>
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

        <Form.Group controlId="formPurpose">
          <Form.Label>Purpose</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPropertyType">
          <Form.Label>Property Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter property type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
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

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formArea">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLength">
          <Form.Label>Length</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formWidth">
          <Form.Label>Width</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
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

        <Form.Group controlId="formMobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLandline">
          <Form.Label>Landline</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter landline"
            value={landline}
            onChange={(e) => setLandline(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Property
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateProperty;
