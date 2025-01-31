import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Components/Home/Home';
import AddUser from './Components/AddUser/AddUser';
import Users from './Components/UserDetails/Users';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';



function App() {
  return (
    <Router>
<Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/mainhome" element={<Home />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/userdetails" element={<Users />} />
      <Route path="/userdetails/:id" element={<UpdateUser />} />
      <Route path="/regi" element={<Register />} />
      <Route path="/log" element={<Login />} />
     

      
</Routes>
    </Router>
  );
}

export default App;
