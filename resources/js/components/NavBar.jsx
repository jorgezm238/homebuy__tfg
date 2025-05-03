import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/navbar.css';

export default function Navbar(){
  const loc = useLocation().pathname;
  const esAuth = loc === '/login' || loc === '/register';

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/"><strong>HomeBuy</strong></Link>
      </div>
      <div className="navbar__links">
        <Link to="/">Inicio</Link>
        {!esAuth && <>
          <Link to="/">Contacto</Link>
          <Link to="/">Mi cuenta</Link>
        </>}
        {loc === '/login'    && <Link to="/register">Registrarse</Link>}
        {loc === '/register' && <Link to="/login">Iniciar Sesión</Link>}
      </div>
    </nav>
  );
}
