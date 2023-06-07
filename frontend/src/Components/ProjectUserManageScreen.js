import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function ProjectUsersManageScreen() {

    const[projectUsers, setProjectUsers] = useState([]);
    const[search, setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(  () => {
        axios.get('http://localhost:3000/admin/getAllProjectUser', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);

            if(res.data.Success){
                setProjectUsers(res.data.ProjectUsers);
            }
            
        })

        
    }, [])

    console.log(projectUsers)

    
  const handleBanProjectUser = async (Email) => {
    try {
      await axios.post(
        'http://localhost:3000/admin/banProjectUser',
        { Email },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );

      // Update the client's ban status locally without making another request
      setProjectUsers((prevClients) =>
        prevClients.map((client) => {
          if (client.Email === Email) {
            return {
              ...client,
              ActiveStatus: !client.ActiveStatus
            };
          }
          return client;
        })
      );
    } catch (error) {
      console.error('Error banning client:', error);
    }
  };

  const handleDeleteClient = async (Email) => {
    try {
        console.log(Email)
      await axios.delete(
        'http://localhost:3000/admin/deleteProjectUser',
        {
          data: { Email },
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );

      setProjectUsers((prevClients) =>
        prevClients.filter((client) => {
          if (client.Email !== Email) {
            return client;
          }
        })
      );
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };  

  const handleSearch = async () => {
    const response = await axios.post('http://localhost:3000/admin/getByNameProjectUser', {Name: search} ,{
        headers: {
          token: localStorage.getItem('token')
        }
      });
      console.log(response)

      if(response.data.Success)
        setProjectUsers(response.data.ProjectUser)

  }


    return ( 
        <>
            <div className='db-outer-link'>
                <div className='dblftNav'><LeftNavigation/></div>
                <div className='dbtopNav'>
                    <TopNavigation/>
                    <input placeholder='search scheme by name' value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                    <Button className='btn-success' onClick={handleSearch}>Search</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>sr. no</th>
                                <th>EMAIL</th>
                                <th>Name</th>
                                <th>AccountNumber</th>
                                <th>ActiveStatus</th>
                                <th>Update</th>
                                <th>Ban</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projectUsers.map((element, i) => {
                                    return(<tr key={element.id}>
                                        <td>{i}</td>
                                        <td>{element.Email}</td>
                                        <td>{element.Name}</td>
                                        <td>{element.AccountNumber}</td>
                                        <td>{element.ActiveStatus?'Active':'Suspended'}</td>
                                        <td><Button className='btn-success' onClick={() => {navigate('/UpdateProjectUser', {state:{Name:element.Name}})}}>Update</Button></td>
                                        <td><Button className='btn-primary' onClick={() => {handleBanProjectUser(element.Email)}}>Ban</Button></td>
                                        <td><Button className='btn-danger' onClick={() => {handleDeleteClient(element.Email)}}>Delete</Button></td>
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

export default ProjectUsersManageScreen;