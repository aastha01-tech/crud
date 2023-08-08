import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import User from './components/User/User';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Edit from './components/Edit/Edit';



function App() {
  const auth = localStorage.getItem('token');
  if (auth) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/users' element={<User />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Register />} />
     <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;