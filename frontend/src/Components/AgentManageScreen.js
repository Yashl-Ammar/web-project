import React, { useEffect, useState } from 'react';
import LeftNavigation from './LeftNavigation';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function AgentManageScreen() {

    const[agents, setAgents] = useState([]);

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

    console.log(agents)

    return ( 
        <>
            <div className='db-outer-link'>
                <div className='dblftNav'><LeftNavigation/></div>
                <div className='dbtopNav'>
                    <TopNavigation/>
                    <input placeholder='search agent by name'/>
                    <Button className='btn-success'>Search</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>sr. no</th>
                                <th>EMAIL</th>
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
                                        <td>{i}</td>
                                        <td>{element.email}</td>
                                        <td>{element.fname}</td>
                                        <td>{element.lname}</td>
                                        <td>{element.contactNo}</td>
                                        <td>{element.ban ? 'Suspended' : 'Active'}</td>
                                        <td><Button className='btn-success'>Update</Button></td>
                                        <td><Button className='btn-primary'>Ban</Button></td>
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

export default AgentManageScreen;