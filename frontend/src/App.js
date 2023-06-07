import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Components/Login';
import ClientManageScreen from './Components/ClientManageScreen';
import PropertyManageScreen from './Components/PropertyManageScreen';
import AgentManageScreen from './Components/AgentManageScreen';
import SchemeManageScreen from './Components/HousingSchemeScreen';
import ProjectUsersManageScreen from './Components/ProjectUserManageScreen';
import UpdateClient from './Components/UpdateClient';
import UpdateAgentUser from './Components/UpdateAgent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/AgentManageScreen' element={<AgentManageScreen/>} />
        <Route path='/PropertyManageScreen' element={<PropertyManageScreen/>} />
        <Route path='/ProjectUsersManageScreen' element={<ProjectUsersManageScreen/>} />
        <Route path='/ClientManageScreen' element={<ClientManageScreen/>} />
        <Route path='/SchemeManageScreen' element={<SchemeManageScreen/>} />
        <Route path='/UpdateClient' element={<UpdateClient/>} />
        <Route path='/UpdateAgentUser' element={<UpdateAgentUser/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
