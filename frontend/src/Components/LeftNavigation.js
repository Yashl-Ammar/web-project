import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';


function LeftNavigation() {
    return ( 
    <>
        <div className='lftNav-outer-div'>
            <div className='lftNav-inner-div'>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="93.000000pt" height="63.000000pt" viewBox="0 0 93.000000 63.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,63.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M373 515 c-29 -13 -53 -28 -53 -32 0 -4 35 -43 77 -85 l77 -78 53 52
                c29 28 56 49 60 45 4 -4 -17 -31 -45 -60 l-52 -53 45 -44 c24 -24 46 -42 48
                -39 3 2 10 14 16 27 10 20 10 27 -3 41 -15 16 -15 19 3 35 21 20 41 14 41 -11
                0 -31 -23 -93 -43 -114 l-20 -21 -53 53 -54 53 -53 -52 c-29 -29 -56 -49 -60
                -45 -4 4 16 31 45 60 l53 53 -47 47 -47 47 -12 -28 c-10 -22 -10 -31 0 -48 10
                -17 10 -23 -5 -39 -9 -10 -21 -19 -26 -19 -14 0 -9 81 9 117 16 34 15 35 -9
                60 l-25 25 -24 -39 c-34 -54 -39 -164 -11 -219 64 -123 200 -169 323 -107 150
                77 170 273 39 385 -72 62 -160 74 -247 33z m132 -56 c4 -5 -1 -19 -11 -30 -17
                -19 -18 -19 -41 3 -17 16 -20 24 -11 30 19 11 56 10 63 -3z m-13 -286 c27 -25
                22 -33 -22 -33 -44 0 -48 5 -23 32 20 22 22 22 45 1z"/>
                </g>
            </svg>
            <h1>Houzz</h1>
            </div>
            <div className="lftNav-ul-div">
      <Nav className="flex-column lftNav-ul">
        <div className="nav-link-div">
          <Nav.Item>
            <Nav.Link as={Link} to="/AgentManageScreen" className="nav-link">
              Agent Management
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="nav-link-div">
          <Nav.Item>
            <Nav.Link as={Link} to="/PropertyManageScreen" className="nav-link">
              Property Management
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="nav-link-div">
          <Nav.Item>
            <Nav.Link as={Link} to="/ClientManageScreen" className="nav-link">
              Client Management
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="nav-link-div">
          <Nav.Item>
            <Nav.Link as={Link} to="/SchemeManageScreen" className="nav-link">
              Housing Scheme Management
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="nav-link-div">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/ProjectUsersManageScreen"
              className="nav-link"
            >
              Project Agent Management
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </div>
            <div></div>
        </div>
        
    </>);
}

export default LeftNavigation;