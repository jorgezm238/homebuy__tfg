// resources/js/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/navbar.css';  // importa tu CSS

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">HomeBuy</NavLink>
        <div className="navbar-menu">
          <NavLink to="/"     className="nav-link" end>Inicio</NavLink>
          <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
          <NavLink to="/mi-cuenta" className="nav-link">Mi cuenta</NavLink>
        </div>
      </div>
    </nav>
  );
}
