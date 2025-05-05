import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import '../../css/navbar.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Si haces clic fuera del dropdown, lo cerramos
  useEffect(() => {
    const onBodyClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onBodyClick)
    return () => document.removeEventListener('click', onBodyClick)
  }, [])

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
          <li className="navbar-account" ref={dropdownRef}>
            <button
              className="account-toggle"
              onClick={() => setOpen(o => !o)}
            >
              Mi cuenta ▾
            </button>
            {open && (
              <div className="account-dropdown">
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
