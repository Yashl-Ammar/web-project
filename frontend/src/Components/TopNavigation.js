import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function TopNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className="tpNav-outer-div">
        <h2>Hello, Admin</h2>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default TopNavigation;
