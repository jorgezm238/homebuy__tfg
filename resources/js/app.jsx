// resources/js/app.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

// Importa FontAwesome (asegúrate de haber hecho `npm install @fortawesome/fontawesome-free`)
import '@fortawesome/fontawesome-free/css/all.min.css';

import NavBar           from './components/NavBar';
import Footer           from './components/Footer';
import Home             from './Pages/Home';
import LoginForm        from './components/LoginForm';
import RegisterForm     from './components/RegisterForm';
import Contacto         from './Pages/Contacto';
import HouseDetail      from './Pages/HouseDetail';
import RutaPrivada      from './components/RutaPrivada';
import MisReservas      from './Pages/MisReservas';
import MisCompras       from './Pages/MisCompras';
import MisTransacciones from './Pages/MisTransacciones';
import MiCuenta         from './Pages/MiCuenta';
import EditarPerfil     from './Pages/EditarPerfil';
import CambiarPassword  from './Pages/CambiarPassword';
import Carrito          from './Pages/Carrito';
import GestionStock     from './Pages/GestionStock';
import Reservar from './Pages/Reservar';
import Checkout from './Pages/Checkout';

import '../css/app.scss';

function AppContent() {
  const location = useLocation();

  // Rutas en las que NO queremos el footer
  const noFooter = ['/login', '/register'];

  return (
    <div className="app">
      <NavBar />

      <main className="app-main">
        <Routes>
          {/* Públicas */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protegidas */}
          <Route element={<RutaPrivada />}>
            <Route path="/contacto"          element={<Contacto />} />
            <Route path="/mi-cuenta"         element={<MiCuenta />} />
            <Route path="/propiedad/:id"     element={<HouseDetail />} />
            <Route path="/mis-reservas"      element={<MisReservas />} />
            <Route path="/mis-compras"       element={<MisCompras />} />
            <Route path="/mis-transacciones" element={<MisTransacciones />} />
            <Route path="/editar-perfil"     element={<EditarPerfil />} />
            <Route path="/cambiar-password"  element={<CambiarPassword />} />
            <Route path="/carrito-detalle"   element={<Carrito />} />
            <Route path="/gestion-stock"     element={<GestionStock />} />
            <Route path="/reservar/:id" element={<Reservar />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Solo muestro el footer si NO estamos en /login ni /register */}
      {!noFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;
