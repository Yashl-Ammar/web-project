import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function ClientManageScreen() {
  const [clients, setClients] = useState([]);
    const[search, setSearch] = useState(''); 
    const navigate = useNavigate();


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/getAllClientUser', {
        headers: {
          token: localStorage.getItem('token')
        }
      });

      if (response.data.Success) {
        setClients(response.data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleBanClient = async (email) => {
    try {
      await axios.post(
        'http://localhost:3000/admin/banClientUser',
        { email },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );

      // Update the client's ban status locally without making another request
      setClients((prevClients) =>
        prevClients.map((client) => {
          if (client.email === email) {
            return {
              ...client,
              ban: !client.ban
            };
          }
          return client;
        })
      );
    } catch (error) {
      console.error('Error banning client:', error);
    }
  };

  const handleDeleteClient = async (email) => {
    try {
      await axios.delete(
        'http://localhost:3000/admin/deleteClientUser',
        {
          data: { email },
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );

      setClients((prevClients) =>
        prevClients.filter((client) => {
          if (client.email !== email) {
            return client;
          }
        })
      );
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };  

  const handleSearch = async () => {
    const response = await axios.post('http://localhost:3000/admin/getByNameClientUser', {name: search} ,{
        headers: {
          token: localStorage.getItem('token')
        }
      });
      console.log(response)

      if(response.data.Success)
        setClients(response.data.client)

  }

  return (
    <>
      <div className="db-outer-link">
        <div className="dblftNav">
          <LeftNavigation />
        </div>
        <div className="dbtopNav">
          <TopNavigation />
          <input placeholder="search client by name" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
          <Button className="btn-success" onClick={() => handleSearch()}>Search</Button>
          <Table striped bordered hover>
            <thead>
              <tr key={0}>
                <th>sr. no</th>
                <th>EMAIL</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>CONTACT</th>
                <th>Status</th>
                <th>Update</th>
                <th>Ban</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((element, i) => {
                return (
                  <tr key={element.id}>
                    <td>{i + 1}</td>
                    <td>{element.email}</td>
                    <td>{element.name}</td>
                    <td>{element.address}</td>
                    <td>{element.contactNo}</td>
                    <td>{element.ban ? 'Suspended' : 'Active'}</td>
                    <td>
                      <Button className="btn-success" onClick={() => {navigate('/UpdateClient', {state:{name:element.name}})}}>Update</Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleBanClient(element.email)}
                        className="btn-primary"
                      >
                        Ban
                      </Button>
                    </td>
                    <td>
                      <Button className="btn-danger" onClick={() => handleDeleteClient(element.email)}>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ClientManageScreen;
