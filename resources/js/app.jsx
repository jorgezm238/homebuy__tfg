// resources/js/app.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import NavBar        from './components/NavBar';
import Home          from './Pages/Home';
import LoginForm     from './components/LoginForm';
import RegisterForm  from './components/RegisterForm';
import Contacto      from './pages/Contacto';
import MiCuenta      from './pages/MiCuenta';
import RutaPrivada   from './components/RutaPrivada';
import HouseDetail   from './pages/HouseDetail';

import '../css/app.scss';
import '../css/navbar.css';
import '../css/home.css';
import '../css/auth.css';
import '../css/contacto.css';
import '../css/micuenta.css';
import '../css/housecard.css';
import '../css/housedetail.css';
const App = () => (
  <BrowserRouter>
    <NavBar />

    <Routes>
      {/* públicas */}
      <Route path="/"         element={<Home />} />
      <Route path="/login"    element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
     
      {/* protegidas */}
      <Route element={<RutaPrivada />}>
        <Route path="/contacto"      element={<Contacto />} />
        <Route path="/mi-cuenta"     element={<MiCuenta />} />
        <Route path="/propiedad/:id"     element={<HouseDetail />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(<App />);
