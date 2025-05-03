import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar     from './components/Navbar';
import Home       from './pages/Home';
import Login      from './pages/Login';
import Register   from './pages/Register';

import '../css/app.scss';

const App = () => (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/"         element={<Home/>}/>
      <Route path="/login"    element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(<App/>);
