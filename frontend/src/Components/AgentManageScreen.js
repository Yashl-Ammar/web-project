import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function AgentManageScreen() {

    const[agents, setAgents] = useState([]);
    const[search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(  () => {
        axios.get('http://localhost:3000/admin/getAllAgentUser', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.Success)
                setAgents(res.data.agents);
        })

        
    }, [])

    const handleBanAgent = async (username) => {
        try {
          await axios.post(
            'http://localhost:3000/admin/banAgentUser',
            { username },
            {
              headers: {
                token: localStorage.getItem('token')
              }
            }
          );
    
          // Update the client's ban status locally without making another request
          setAgents((prevClients) =>
            prevClients.map((client) => {
              if (client.username === username) {
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
    
    const handleDeleteAgent = async (username) => {
        try {
            await axios.delete(
            'http://localhost:3000/admin/deleteAgentUser',
            {
              data: { username },
              headers: {
                token: localStorage.getItem('token')
              }
            }
          );
    
          setAgents((prevClients) =>
            prevClients.filter((client) => {
              if (client.username !== username) {
                return client;
              }
            })
          );
        } catch (error) {
          console.error('Error deleting client:', error);
        }
    };
    
      const handleSearch = async () => {
        const response = await axios.post('http://localhost:3000/admin/getByNameAgentUser', {fname: search} ,{
            headers: {
              token: localStorage.getItem('token')
            }
          });
          console.log(response)
    
          if(response.data.agent !== undefined )
            setAgents(response.data.agent)
    
      }


    console.log(agents)

    return ( 
        <>
            <div className='db-outer-link'>
                <div className='dblftNav'><LeftNavigation/></div>
                <div className='dbtopNav'>
                    <TopNavigation/>
                    <input placeholder='search agent by name' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                    <Button className='btn-success' onClick={handleSearch} >Search</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>sr. no</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Contact Number</th>
                                <th>Status</th>
                                <th>View</th>
                                <th>Ban</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agents.map((element, i) => {
                                    return(<tr key={element.id}>
                                        <td>{i+1}</td>
                                        <td>{element.username}</td>
                                        <td>{element.fname}</td>
                                        <td>{element.lname}</td>
                                        <td>{element.contactNo}</td>
                                        <td>{element.ban ? 'Suspended' : 'Active'}</td>
                                        <td><Button className='btn-success' onClick={() => {navigate('/UpdateAgentUser', {state:{name:element.fname}})}}>Update</Button></td>
                                        <td><Button className='btn-primary' onClick={() => {handleBanAgent(element.username)}}>Ban</Button></td>
                                        <td><Button className='btn-danger' onClick={() => {handleDeleteAgent(element.username)}}>Delete</Button></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            
        </>
     );
}

export default AgentManageScreen;