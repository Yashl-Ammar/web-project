import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function PropertyManageScreen() {

    const[properties, setProperties] = useState([]);

    useEffect(  () => {
        axios.get('http://localhost:3000/admin/getAllProperty', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);
            if(res.data.Success)
                setProperties(res.data.Properties);
        })

        
    }, [])

    console.log(properties)

    return ( 
        <>
            <div className='db-outer-link'>
                <div className='dblftNav'><LeftNavigation/></div>
                <div className='dbtopNav'>
                    <TopNavigation/>
                    <input placeholder='search property by name'/>
                    <Button className='btn-success'>Search</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>sr. no</th>
                                <th>EMAIL</th>
                                <th>Description</th>
                                <th>landline</th>
                                <th>mobileNo</th>
                                <th>propertytype</th>
                                <th>city</th>
                                <th>Title</th>
                                <th>Area</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                properties.map((element, i) => {
                                    return(<tr key={element.id}>
                                        <td>{i+1}</td>
                                        <td>{element.email}</td>
                                        <td>{element.description}</td>
                                        <td>{element.landline}</td>
                                        <td>{element.mobileNo}</td>
                                        <td>{element.propertytype}</td>
                                        <td>{element.city}</td>
                                        <td>{element.Title}</td>
                                        <td>{element.Area}</td>
                                        <td><Button className='btn-success'>Update</Button></td>
                                        <td><Button className='btn-danger'>Delete</Button></td>
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

export default PropertyManageScreen;