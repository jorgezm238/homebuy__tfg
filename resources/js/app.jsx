import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar       from './components/NavBar';
import Home         from './Pages/Home';
import LoginForm    from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Contacto     from './Pages/Contacto';
import HouseDetail  from './Pages/HouseDetail';
import RutaPrivada  from './components/RutaPrivada';
import MisReservas from './Pages/MisReservas';
import MisCompras from './Pages/MisCompras';
import MisTransacciones from './Pages/MisTransacciones';
import MiCuenta        from './Pages/MiCuenta';
import EditarPerfil    from './Pages/EditarPerfil';
import CambiarPassword from './Pages/CambiarPassword';
import Carrito        from './Pages/Carrito';

import '../css/app.scss';
import '../css/navbar.css';
import '../css/home.css';
import '../css/auth.css';
import '../css/contacto.css';
import '../css/micuenta.css';
import '../css/housecard.css';
import '../css/housedetail.css';
import '../css/mis-reservas.css';
import '../css/mis-compras.css';
import '../css/mis-transacciones.css';
import '../css/editar-perfil.css';
import '../css/cambiar-password.css';
import '../css/carrito.css';

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
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/mis-compras" element={<MisCompras />} />
          <Route path="/mis-transacciones" element={<MisTransacciones />} />
          <Route path="/editar-perfil"       element={<EditarPerfil />} />
          <Route path="/cambiar-password"    element={<CambiarPassword />} />
          <Route path="/carrito-detalle" element={<Carrito />} />


        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
