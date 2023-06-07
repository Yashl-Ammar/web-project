import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function TopNavigation() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') === null){
            navigate('/login');
        }
    }, [])

    return ( 
        <>
            <div className='tpNav-outer-div'>
                <h2>Hello, Admin</h2>
                <button onClick={() => {
                    localStorage.clear();
                    navigate('/login')
                }}>logout</button>
                
            </div>
        </>
     );
}

export default TopNavigation;