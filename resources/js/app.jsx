import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

//iconos y estilos globales
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/app.scss';
import '../css/migasdepan.css';

//componentes
import NavBar           from './components/NavBar';
import Footer           from './components/Footer';
import MigasDePan       from './components/migasdepan';
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
import Reservar         from './Pages/Reservar';
import Checkout         from './Pages/Checkout';
import SearchResults    from './components/SearchResults';
import RutaAdmin        from './components/RutaAdmin';

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem('token');       
  const noFooter = ['/login', '/register'];

  return (
    <div className="app">
      <NavBar />

      <main className="app-main">
        {/*solo mostrar migas de pan si hay token */}
        {token && <MigasDePan />}

        <Routes>
          {/*rutas públicas */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/*rutas privadas */}
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
            <Route path="/reservar/:id"      element={<Reservar />} />
            <Route path="/checkout"          element={<Checkout />} />
            <Route path="/busqueda"          element={<SearchResults />} />
          

         {/*rutas de admin */}
          <Route element={<RutaAdmin />}>
            <Route path="/gestion-stock" element={<GestionStock />} />
            </Route>
          </Route>
          

          {/*fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/*footer */}
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

//inicializamos React una sola vez
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
