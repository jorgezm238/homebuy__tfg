import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar       from './components/NavBar';
import Home         from './Pages/Home';
import LoginForm    from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Contacto     from './Pages/Contacto';
import MiCuenta     from './Pages/MiCuenta';
import HouseDetail  from './Pages/HouseDetail';
import RutaPrivada  from './components/RutaPrivada';

import '../css/app.scss';
import '../css/navbar.css';
import '../css/home.css';
import '../css/auth.css';
import '../css/contacto.css';
import '../css/micuenta.css';
import '../css/housecard.css';
import '../css/housedetail.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Públicas */}
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<LoginForm />} />
        <Route path="/register"   element={<RegisterForm />} />

        {/* Protegidas */}
        <Route element={<RutaPrivada />}>
          <Route path="/contacto"        element={<Contacto />} />
          <Route path="/mi-cuenta"       element={<MiCuenta />} />
          <Route path="/propiedad/:id" element={<HouseDetail />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
