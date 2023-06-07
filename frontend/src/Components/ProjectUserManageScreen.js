import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function ProjectUsersManageScreen() {

    const[projectUsers, setProjectUsers] = useState([]);

    useEffect(  () => {
        axios.get('http://localhost:3000/admin/getAllProjectUser', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);

            if(res.data.Success){
                setProjectUsers(res.data.ProjectProducts);
            }
            
        })

        
    }, [])

    console.log(projectUsers)

    return ( 
        <>
            <div className='db-outer-link'>
                <div className='dblftNav'><LeftNavigation/></div>
                <div className='dbtopNav'>
                    <TopNavigation/>
                    <input placeholder='search scheme by name'/>
                    <Button className='btn-success'>Search</Button>
                    {/* <Table striped bordered hover>
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
                                        <td>{i}</td>
                                        <td>{element.Email}</td>
                                        <td>{element.Title}</td>
                                        <td>{element.City}</td>
                                        <td>{element.State}</td>
                                        <td>{element.Country}</td>
                                        <td>{element.State}</td>
                                        <td><Button className='btn-success'>Update</Button></td>
                                        <td><Button className='btn-danger'>Delete</Button></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table> */}
                </div>
            </div>
            
        </>
     );
}

export default ProjectUsersManageScreen;