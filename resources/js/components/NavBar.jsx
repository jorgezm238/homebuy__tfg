import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import '../../css/navbar.css'  // Asegúrate de tener este CSS

export default function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = async () => {
    try {
      await api.post('/logout')
    } catch (err) {
      console.error(err)
    }
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">HomeBuy</Link>
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

          {token
            ? (
              <li className="navbar-account">
                <span className="account-label">Mi Cuenta ▾</span>
                <ul className="account-dropdown">
                  <li>
                    <Link to="/mi-cuenta">Detalles</Link>
                  </li>
                  <li>
                    <Link to="/mis-transacciones" >  Transacciones</Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </li>
            )
            : (
              <li><Link to="/login">Iniciar Sesión</Link></li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}
