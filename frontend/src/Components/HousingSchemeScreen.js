import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

function SchemeManageScreen() {

    const[schemes, setSchemes] = useState([]);
    const[search, setSearch] = useState([]);

    const navigate = useNavigate();

    useEffect(  () => {
        axios.get('http://localhost:3000/admin/getAllHousingScheme', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.Success)
                setSchemes(res.data.ProjectProducts);
        })

        
    }, [])

    const handleDeleteScheme = async (Title) => {
        try {
          await axios.delete(
            'http://localhost:3000/admin/deleteHousingScheme',
            {
              data: { Title },
              headers: {
                token: localStorage.getItem('token')
              }
            }
          );
    
          setSchemes((prevClients) =>
            prevClients.filter((client) => {
              if (client.Title !== Title) {
                return client;
              }
            })
          );
        } catch (error) {
          console.error('Error deleting client:', error);
        }
      };  
    
      const handleSearch = async () => {
        const response = await axios.post('http://localhost:3000/admin/getByNameHousingScheme', {Title: search} ,{
            headers: {
              token: localStorage.getItem('token')
            }
          });
          console.log(response)
    
          if(response.data.Success)
          setSchemes(response.data.product)
    
      }

    console.log(schemes)

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
                                <th>Title</th>
                                <th>Description</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                schemes.map((element, i) => {
                                    return(<tr key={element.id}>
                                        <td>{i+1}</td>
                                        <td>{element.Email}</td>
                                        <td>{element.Title}</td>
                                        <td>{element.City}</td>
                                        <td>{element.State}</td>
                                        <td>{element.Country}</td>
                                        <td>{element.State}</td>
                                        <td><Button className='btn-success' onClick={() => {navigate('/UpdateHousingScheme',{state:{Title:element.Title}})}}>Update</Button></td>
                                        <td><Button className='btn-danger' onClick={()=> {handleDeleteScheme(element.Title)}}>Delete</Button></td>
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

export default SchemeManageScreen;