import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar       from './components/NavBar'
import Home         from './Pages/Home'
import LoginForm    from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Contacto     from './Pages/Contacto'
import MiCuenta     from './Pages/MiCuenta'

/* Tus CSS */
import '../css/app.scss'
import '../css/navbar.css'
import '../css/auth.css'
import '../css/home.css'
import '../css/housecard.css'
import '../css/contacto.css'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/login"     element={<LoginForm />} />
      <Route path="/register"  element={<RegisterForm />} />
      <Route path="/contacto"  element={<Contacto />} />
      <Route path="/mi-cuenta" element={<MiCuenta />} />
    </Routes>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(<App />)
